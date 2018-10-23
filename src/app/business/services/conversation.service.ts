import { Injectable } from '@angular/core';
import {
    Router,
    NavigationEnd,
} from '@angular/router';
import { ListBaseService } from './list-base.service';
import { UserService } from './user.service';
import { _HttpClient } from '../../common/core/services';
import {
    Conversation,
    CommentType,
    Comment
} from '@models/conversation.class';
import { User } from '../models/user.class';
import { Subject, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

var counter = 1;
@Injectable({
    providedIn: 'root',
})
export class ConversationService extends ListBaseService {
    protected baseUrl = '/conversations';

    public pageIndex: number = 1;
    public pageSize: number = 20;

    // 以下变量需要随时维护
    public authorId: string;
    public emptyComment$: BehaviorSubject<Comment>;
    private hadSavedConversation: boolean = false;
    public commentCount: number;
    public conversation: Conversation;             // 一个服务实例围绕着 conversation 对象做一系列处理
    public users: User[];                          // 只保存其他用户（不包括当前登录用户），和 conversation 相关的用户信息，每次查找用户时，从这里查，避免从数据库重复获取
    
    get user() { return this.userService.user; }

    constructor(
        protected http: _HttpClient,
        private userService: UserService,
    ) {
        super(http);
        console.log('\n******** ConversationService constructor ', counter++);
        this.clear();
    }

    /**
     * inlet
     */
    public createConversation(pid: string) {
        this.clear();
        this.conversation = new Conversation(this.user, pid);
        return this.conversation;
    }

    /**
     * inlet
     */
    public findOne(id, withRequestProgress?) {
        this.clear();
        return super.findOne(id, withRequestProgress).pipe(map(res => {
            if (!res.error) {
                this.commentCount = res.data.commentCount;
                this.conversation = res.data.conversation;
                this.users = res.data.users;
                this.hadSavedConversation = true;
                return res;
            }
            return res;
        }));
    }

    public getCommentsByPage(pageIndex: number, pageSize: number) {
        this.pageIndex = pageIndex;
        this.pageSize = pageSize;
        this.http.get(`${this.baseUrl}/${this.conversation._id}/comments`, {
            params: {
                pageIndex,
                pageSize
            }
        }).pipe(map(res => {
            if (res.error) {

            }
            else {
                this.commentCount = res.data.count;
                this.conversation.comments = res.data.docs;
                return res;
            }
        }))
    }

    public upsertComment(comment: Comment) {
        let tmp = comment.hadSaved;
        let fn = tmp ?
            () => this.http.patch(`${this.baseUrl}/${this.conversation._id}/comments/${this.emptyComment$.value._id}`, {
                comment: comment
            }):    
            () => this.http.post(`${this.baseUrl}/${this.conversation._id}/comments`, {
                comment: comment,
                conversation: this.hadSavedConversation ? null : this.conversation
            });

        comment.hadSaved = true;
        return fn().pipe(map(res => {
            if (!res.error && res.data === true) {
                if(!tmp) {
                    // post comment
                    if(!this.hadSavedConversation) {
                        this.hadSavedConversation = true;
                    }
                    this.conversation.comments.push(comment);
                    this.commentCount++;
                }
                if(!this.users.find(v => v._id === this.user._id))
                    this.users.push(this.user);
                this.newEmptyComment();
            }
            else {
                comment.hadSaved = tmp;
            }
            return res;
        }))
    }

    public deleteComment(commentId: String) {
        let commentIndex = this.conversation.comments.findIndex(v => v._id === commentId);
        if(commentIndex !== -1) {
            return this.http.delete(`${this.baseUrl}/${this.conversation._id}/comments/${this.conversation.comments[commentIndex]._id}`).pipe(map(res => {
                if (!res.error) {
                    if (res.data === true) {
                        this.conversation.comments.splice(commentIndex, 1);
                        this.commentCount--;
                        if(!this.conversation.comments.find(v => v.from_uid === this.user._id)) {
                            let i = this.users.findIndex(v => v._id === this.user._id);
                            if(i !== -1)
                                this.users.splice(i, 1);
                        }
                        return res;
                    }
                }
                return res;
            }));
        }
    }

    public getAuthorOfComment(from_uid: string) {
        return this.users.find(user => user._id === from_uid);
    }

    private newEmptyComment() {
        let comment = new Comment(this.user, false, CommentType.MAIN);
        if (!this.emptyComment$) {
            this.emptyComment$ = new BehaviorSubject<Comment>(comment);
        }
        else {
            this.emptyComment$.next(comment);
        }
    }

    public quoteReplyComment(comment: Comment) {
        let quote = comment.content[comment.svid].md;
        quote = quote.split('\n').map(v => '> ' + v).join('\n');
        let empC = this.emptyComment$.value;
        empC.content[empC.svid].md = quote;
    }

    public clear() {
        this.users = [];
        this.commentCount = 0;
        this.conversation = null;
        this.hadSavedConversation = null;
        this.newEmptyComment();
    }
}
