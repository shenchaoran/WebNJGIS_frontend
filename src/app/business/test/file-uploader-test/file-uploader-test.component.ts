import { Component, OnInit } from '@angular/core';
import { UploadInput } from 'ngx-uploader';
import { ResourceSrc } from '@models';

@Component({
    selector: 'ogms-file-uploader-test',
    templateUrl: './file-uploader-test.component.html',
    styleUrls: ['./file-uploader-test.component.scss']
})
export class FileUploaderTestComponent implements OnInit {

    uploadInput: UploadInput;
    fileId;

    checkOptionsOne = [
        { label: 'Apple', value: 'Apple', checked: true },
        { label: 'Pear', value: 'Pear', checked: false },
        { label: 'Orange', value: 'Orange', checked: false }
    ];

    source = JSON.parse('{"placeholder":"Data type","children":[{"placeholder":"Data item","label":"Input","value":"inputs","children":[{"placeholder":"Table column","label":"Initialization file","value":{"ext":".ini","description":"","schemaId":"ini","name":"Initialization file","id":"--i"},"children":[{"label":"leafc_to_litr1c","value":"leafc_to_litr1c"},{"label":"leafc_to_litr2c","value":"leafc_to_litr2c"},{"label":"leafc_to_litr3c","value":"leafc_to_litr3c"},{"label":"leafc_to_litr4c","value":"leafc_to_litr4c"},{"label":"proj_lai","value":"proj_lai"},{"label":"all_lai","value":"all_lai"},{"label":"daily_hr","value":"daily_hr"}]},{"placeholder":"Table column","label":"Meteorological data","value":{"ext":".mtc43","description":"meteorology data, include year, tmax, tmin, tday, prcp, vpd, srad, daylen","schemaId":"met_data","name":"Meteorological data","id":"--m"},"children":[{"label":"leafc_to_litr1c","value":"leafc_to_litr1c"},{"label":"leafc_to_litr2c","value":"leafc_to_litr2c"},{"label":"leafc_to_litr3c","value":"leafc_to_litr3c"},{"label":"leafc_to_litr4c","value":"leafc_to_litr4c"},{"label":"proj_lai","value":"proj_lai"},{"label":"all_lai","value":"all_lai"},{"label":"daily_hr","value":"daily_hr"}]},{"placeholder":"Table column","label":"Restart input","value":{"ext":".endpoint","description":"","schemaId":"restart","name":"Restart input","id":"--ri"},"children":[{"label":"leafc_to_litr1c","value":"leafc_to_litr1c"},{"label":"leafc_to_litr2c","value":"leafc_to_litr2c"},{"label":"leafc_to_litr3c","value":"leafc_to_litr3c"},{"label":"leafc_to_litr4c","value":"leafc_to_litr4c"},{"label":"proj_lai","value":"proj_lai"},{"label":"all_lai","value":"all_lai"},{"label":"daily_hr","value":"daily_hr"}]},{"placeholder":"Table column","label":"Restart output","value":{"ext":".endpoint","description":"","schemaId":"restart","name":"Restart output","id":"--ro"},"children":[{"label":"leafc_to_litr1c","value":"leafc_to_litr1c"},{"label":"leafc_to_litr2c","value":"leafc_to_litr2c"},{"label":"leafc_to_litr3c","value":"leafc_to_litr3c"},{"label":"leafc_to_litr4c","value":"leafc_to_litr4c"},{"label":"proj_lai","value":"proj_lai"},{"label":"all_lai","value":"all_lai"},{"label":"daily_hr","value":"daily_hr"}]},{"placeholder":"Table column","label":"CO2 concentration","value":{"ext":".txt","description":"","schemaId":"co2","name":"CO2 concentration","id":"--co2"},"children":[{"label":"leafc_to_litr1c","value":"leafc_to_litr1c"},{"label":"leafc_to_litr2c","value":"leafc_to_litr2c"},{"label":"leafc_to_litr3c","value":"leafc_to_litr3c"},{"label":"leafc_to_litr4c","value":"leafc_to_litr4c"},{"label":"proj_lai","value":"proj_lai"},{"label":"all_lai","value":"all_lai"},{"label":"daily_hr","value":"daily_hr"}]},{"placeholder":"Table column","label":"Ecophysiological Constants","value":{"ext":".epc","description":"","schemaId":"epc","name":"Ecophysiological Constants","id":"--epc"},"children":[{"label":"leafc_to_litr1c","value":"leafc_to_litr1c"},{"label":"leafc_to_litr2c","value":"leafc_to_litr2c"},{"label":"leafc_to_litr3c","value":"leafc_to_litr3c"},{"label":"leafc_to_litr4c","value":"leafc_to_litr4c"},{"label":"proj_lai","value":"proj_lai"},{"label":"all_lai","value":"all_lai"},{"label":"daily_hr","value":"daily_hr"}]}]},{"placeholder":"Data item","label":"Output","value":"outputs","children":[{"placeholder":"Table column","label":"daily output","value":{"ext":".dayout.ascii","description":"","schemaId":"daily_output","name":"daily output","id":"--do"},"children":[{"label":"leafc_to_litr1c","value":"leafc_to_litr1c"},{"label":"leafc_to_litr2c","value":"leafc_to_litr2c"},{"label":"leafc_to_litr3c","value":"leafc_to_litr3c"},{"label":"leafc_to_litr4c","value":"leafc_to_litr4c"},{"label":"proj_lai","value":"proj_lai"},{"label":"all_lai","value":"all_lai"},{"label":"daily_hr","value":"daily_hr"}]},{"placeholder":"Table column","label":"annual output","value":{"ext":".annout.ascii","description":"","schemaId":"ann_output","name":"annual output","id":"--ao"},"children":[{"label":"leafc_to_litr1c","value":"leafc_to_litr1c"},{"label":"leafc_to_litr2c","value":"leafc_to_litr2c"},{"label":"leafc_to_litr3c","value":"leafc_to_litr3c"},{"label":"leafc_to_litr4c","value":"leafc_to_litr4c"},{"label":"proj_lai","value":"proj_lai"},{"label":"all_lai","value":"all_lai"},{"label":"daily_hr","value":"daily_hr"}]}]}]}');
    selectData;

    constructor() {
        this.uploadInput = {
            type: 'uploadAll',
            url: '/data',
            method: 'POST',
            data: {
                desc: '',
                src: ResourceSrc.EXTERNAL
            },
            fieldName: 'geo-data',
            headers: {
                Authorization: 'bearer ' + JSON.parse(localStorage.getItem('jwt')).token
            }
        };
    }

    ngOnInit() {
    }

    onSelected(e) {
        console.log(e);
    }

    ngAfterViewInit() {
        setTimeout(() => {
            let v = $('#map').length;
            console.log(v);
            if (v) {
                var freeBus = {
                    "type": "FeatureCollection",
                    "features": [
                        {
                            "type": "Feature",
                            "geometry": {
                                "type": "LineString",
                                "coordinates": [
                                    [-105.00341892242432, 39.75383843460583],
                                    [-105.0008225440979, 39.751891803969535]
                                ]
                            },
                            "properties": {
                                "popupContent": "This is a free bus line that will take you across downtown.",
                                "underConstruction": false
                            },
                            "id": 1
                        },
                        {
                            "type": "Feature",
                            "geometry": {
                                "type": "LineString",
                                "coordinates": [
                                    [-105.0008225440979, 39.751891803969535],
                                    [-104.99820470809937, 39.74979664004068]
                                ]
                            },
                            "properties": {
                                "popupContent": "This is a free bus line that will take you across downtown.",
                                "underConstruction": true
                            },
                            "id": 2
                        },
                        {
                            "type": "Feature",
                            "geometry": {
                                "type": "LineString",
                                "coordinates": [
                                    [-104.99820470809937, 39.74979664004068],
                                    [-104.98689651489258, 39.741052354709055]
                                ]
                            },
                            "properties": {
                                "popupContent": "This is a free bus line that will take you across downtown.",
                                "underConstruction": false
                            },
                            "id": 3
                        }
                    ]
                };

                var lightRailStop = {
                    "type": "FeatureCollection",
                    "features": [
                        {
                            "type": "Feature",
                            "properties": {
                                "popupContent": "18th & California Light Rail Stop"
                            },
                            "geometry": {
                                "type": "Point",
                                "coordinates": [-104.98999178409576, 39.74683938093904]
                            }
                        }, {
                            "type": "Feature",
                            "properties": {
                                "popupContent": "20th & Welton Light Rail Stop"
                            },
                            "geometry": {
                                "type": "Point",
                                "coordinates": [-104.98689115047453, 39.747924136466565]
                            }
                        }
                    ]
                };

                var bicycleRental = {
                    "type": "FeatureCollection",
                    "features": [
                        {
                            "geometry": {
                                "type": "Point",
                                "coordinates": [
                                    -104.9998241,
                                    39.7471494
                                ]
                            },
                            "type": "Feature",
                            "properties": {
                                "popupContent": "This is a B-Cycle Station. Come pick up a bike and pay by the hour. What a deal!"
                            },
                            "id": 51
                        },
                        {
                            "geometry": {
                                "type": "Point",
                                "coordinates": [
                                    -104.9983545,
                                    39.7502833
                                ]
                            },
                            "type": "Feature",
                            "properties": {
                                "popupContent": "This is a B-Cycle Station. Come pick up a bike and pay by the hour. What a deal!"
                            },
                            "id": 52
                        },
                        {
                            "geometry": {
                                "type": "Point",
                                "coordinates": [
                                    -104.9963919,
                                    39.7444271
                                ]
                            },
                            "type": "Feature",
                            "properties": {
                                "popupContent": "This is a B-Cycle Station. Come pick up a bike and pay by the hour. What a deal!"
                            },
                            "id": 54
                        },
                        {
                            "geometry": {
                                "type": "Point",
                                "coordinates": [
                                    -104.9960754,
                                    39.7498956
                                ]
                            },
                            "type": "Feature",
                            "properties": {
                                "popupContent": "This is a B-Cycle Station. Come pick up a bike and pay by the hour. What a deal!"
                            },
                            "id": 55
                        },
                        {
                            "geometry": {
                                "type": "Point",
                                "coordinates": [
                                    -104.9933717,
                                    39.7477264
                                ]
                            },
                            "type": "Feature",
                            "properties": {
                                "popupContent": "This is a B-Cycle Station. Come pick up a bike and pay by the hour. What a deal!"
                            },
                            "id": 57
                        },
                        {
                            "geometry": {
                                "type": "Point",
                                "coordinates": [
                                    -104.9913392,
                                    39.7432392
                                ]
                            },
                            "type": "Feature",
                            "properties": {
                                "popupContent": "This is a B-Cycle Station. Come pick up a bike and pay by the hour. What a deal!"
                            },
                            "id": 58
                        },
                        {
                            "geometry": {
                                "type": "Point",
                                "coordinates": [
                                    -104.9788452,
                                    39.6933755
                                ]
                            },
                            "type": "Feature",
                            "properties": {
                                "popupContent": "This is a B-Cycle Station. Come pick up a bike and pay by the hour. What a deal!"
                            },
                            "id": 74
                        }
                    ]
                };

                var campus = {
                    "type": "Feature",
                    "properties": {
                        "popupContent": "This is the Auraria West Campus",
                        "style": {
                            weight: 2,
                            color: "#999",
                            opacity: 1,
                            fillColor: "#B0DE5C",
                            fillOpacity: 0.8
                        }
                    },
                    "geometry": {
                        "type": "MultiPolygon",
                        "coordinates": [
                            [
                                [
                                    [-105.00432014465332, 39.74732195489861],
                                    [-105.00715255737305, 39.74620006835170],
                                    [-105.00921249389647, 39.74468219277038],
                                    [-105.01067161560059, 39.74362625960105],
                                    [-105.01195907592773, 39.74290029616054],
                                    [-105.00989913940431, 39.74078835902781],
                                    [-105.00758171081543, 39.74059036160317],
                                    [-105.00346183776855, 39.74059036160317],
                                    [-105.00097274780272, 39.74059036160317],
                                    [-105.00062942504881, 39.74072235994946],
                                    [-105.00020027160645, 39.74191033368865],
                                    [-105.00071525573731, 39.74276830198601],
                                    [-105.00097274780272, 39.74369225589818],
                                    [-105.00097274780272, 39.74461619742136],
                                    [-105.00123023986816, 39.74534214278395],
                                    [-105.00183105468751, 39.74613407445653],
                                    [-105.00432014465332, 39.74732195489861]
                                ], [
                                    [-105.00361204147337, 39.74354376414072],
                                    [-105.00301122665405, 39.74278480127163],
                                    [-105.00221729278564, 39.74316428375108],
                                    [-105.00283956527711, 39.74390674342741],
                                    [-105.00361204147337, 39.74354376414072]
                                ]
                            ], [
                                [
                                    [-105.00942707061768, 39.73989736613708],
                                    [-105.00942707061768, 39.73910536278566],
                                    [-105.00685214996338, 39.73923736397631],
                                    [-105.00384807586671, 39.73910536278566],
                                    [-105.00174522399902, 39.73903936209552],
                                    [-105.00041484832764, 39.73910536278566],
                                    [-105.00041484832764, 39.73979836621592],
                                    [-105.00535011291504, 39.73986436617916],
                                    [-105.00942707061768, 39.73989736613708]
                                ]
                            ]
                        ]
                    }
                };

                var coorsField = {
                    "type": "Feature",
                    "properties": {
                        "popupContent": "Coors Field"
                    },
                    "geometry": {
                        "type": "Point",
                        "coordinates": [-104.99404191970824, 39.756213909328125]
                    }
                };

                var map = L.map('map').setView([39.74739, -105], 13);

                L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
                    maxZoom: 18,
                    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
                        '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
                        'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
                    id: 'mapbox.light'
                }).addTo(map);

                var baseballIcon = L.icon({
                    iconUrl: 'baseball-marker.png',
                    iconSize: [32, 37],
                    iconAnchor: [16, 37],
                    popupAnchor: [0, -28]
                });

                let onEachFeature = function (feature, layer) {
                    var popupContent = "<p>I started out as a GeoJSON " +
                        feature.geometry.type + ", but now I'm a Leaflet vector!</p>";

                    if (feature.properties && feature.properties.popupContent) {
                        popupContent += feature.properties.popupContent;
                    }

                    layer.bindPopup(popupContent);
                }

                L.geoJSON([bicycleRental, campus], {

                    style: function (feature) {
                        return feature.properties && feature.properties.style;
                    },

                    onEachFeature: onEachFeature,

                    pointToLayer: function (feature, latlng) {
                        return L.circleMarker(latlng, {
                            radius: 8,
                            fillColor: "#ff7800",
                            color: "#000",
                            weight: 1,
                            opacity: 1,
                            fillOpacity: 0.8
                        });
                    }
                }).addTo(map);

                L.geoJSON(freeBus, {

                    filter: function (feature, layer) {
                        if (feature.properties) {
                            // If the property "underConstruction" exists and is true, return false (don't render features under construction)
                            return feature.properties.underConstruction !== undefined ? !feature.properties.underConstruction : true;
                        }
                        return false;
                    },

                    onEachFeature: onEachFeature
                }).addTo(map);

                var coorsLayer = L.geoJSON(coorsField, {

                    pointToLayer: function (feature, latlng) {
                        return L.marker(latlng, { icon: baseballIcon });
                    },

                    onEachFeature: onEachFeature
                }).addTo(map);
            }

            var myChart = echarts.init($('#echart-dom')[0]);
            var option = {
                title: {
                    text: 'ECharts ????'
                },
                tooltip: {},
                legend: {
                    data: ['??']
                },
                xAxis: {
                    data: ["??", "???", "???", "??", "???", "??"]
                },
                yAxis: {},
                series: [{
                    name: '??',
                    type: 'bar',
                    data: [5, 20, 36, 10, 10, 20]
                }]
            };
            myChart.setOption(option);
        }, 0);
    }

    onUploaded(id) {
        console.log(id);
        this.fileId = id;
    }

    _onFileUpload(e) {

    }

    _onFileUploadCompleted(data) {
        if (data.error) {

        }
        else {

        }
    }

    _onClearUploaded() {

    }
}
