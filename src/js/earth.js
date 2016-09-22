/**
 * Created by scadinot on 07/06/16.
 */

function Earth() {
    this.viewer = null;
}

Earth.prototype = {
    moveCamera: function(x, y, z) {
        this.viewer.camera.flyTo({
            destination : Cesium.Cartesian3.fromElements(x, y, z),
            position: {
                heading: Cesium.Math.toRadians(90.0),
                pitch: Cesium.Math.toRadians(45.0),
                roll: 0.0
            }
        });
    },

    init: function() {
        this.viewer = new Cesium.Viewer('cesiumContainer', {
            imageryProvider : new Cesium.ArcGisMapServerImageryProvider({
                url : 'http://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer'
            }),
                baseLayerPicker : false
        });

        this.viewer.terrainProvider = new Cesium.CesiumTerrainProvider({
            url : '//assets.agi.com/stk-terrain/world'
        });

        var that = this;
        this.viewer.canvas.addEventListener('click', function(e) {
            var mousePosition = new Cesium.Cartesian2(e.clientX, e.clientY);

            var ellipsoid = that.viewer.scene.globe.ellipsoid;
            console.log(that.viewer.camera.pickEllipsoid(mousePosition, ellipsoid));
        });

        /*setInterval(function() {
            console.log(that.viewer.camera.position)
        }, 1000);*/
    }
};