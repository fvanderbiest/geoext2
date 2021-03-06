/**
 * Copyright (c) 2008-2009 The Open Source Geospatial Foundation
 *
 * Published under the BSD license.
 * See http://svn.geoext.org/core/trunk/geoext/license.txt for the full text
 * of the license.
 */

/** api: example[permalink]
 *  Permalink
 *  ---------
 *  Display a permalink each time the map changes position.
 */

Ext.require('Ext.container.Viewport');
Ext.require('Ext.window.MessageBox');

var permalinkProvider;


Ext.application({
    name: 'HelloGeoExt2',
    launch: function() {
        permalinkProvider = new GeoExt.state.PermalinkProvider({
            encodeType: false
        });
        Ext.state.Manager.setProvider(permalinkProvider);

        var map = new OpenLayers.Map({});
        var ol_wms = new OpenLayers.Layer.WMS(
            "OpenLayers WMS", 
            "http://vmap0.tiles.osgeo.org/wms/vmap0", 
            {
                layers: "basic"
            },
            {
                attribution: 'Metacarta WMS hosted on <a href="http://www.osgeo.org/" target="_blank">osgeo.org<a>'
            }
            );
        
        map.addLayers([ol_wms]);
        
        var mappanel = Ext.create('GeoExt.panel.Map', {
            renderTo: 'mappanel',
            width: 400,
            height: 400,
            title: 'The GeoExt.panel.Map-class',
            map: map
            ,
            stateful: true
            ,
            stateId: 'mappanel'
            //,mapCenter: '2.648274,39.567489'
            //,mapZoom: 7
            ,
            mapExtent: '7,51,8,52'
            ,
            dockedItems: [{
                xtype: 'toolbar',
                dock: 'top',
                items: [{
                    text: 'Current center of the map',
                    handler: function(){
                        var c = GeoExt.panel.Map.guess().getMap().getCenter();
                        Ext.Msg.alert(this.getText(), c.toString());
                    }
                }]
            }]
        });
        
        // update link when state chnages
        var onStatechange = function(provider) {
            var l = provider.getLink();
            Ext.get("permalink").update("<a href=" + l + ">" + l + "</a>");
        };
        permalinkProvider.on({
            statechange: onStatechange
        });

    }
});