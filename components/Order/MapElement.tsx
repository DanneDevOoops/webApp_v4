import React from 'react';
import { View, ViewStyle } from 'react-native';
import * as Style from '../../assets/styles';
import MapView from 'react-native-maps';


const MapElement = ({
    appContext,
    userPositionMarker,
    orderLocationMarker,
    orderDirectionsPath,
    mapRef,
}: {
    appContext: any;
    userPositionMarker: React.ReactElement | null;
    orderLocationMarker: React.ReactElement | null;
    orderDirectionsPath: React.ReactElement | null;
    mapRef: any;
}): null | React.ReactElement => {
    if (
        !appContext.userPosition?.latitude ||
        !appContext.userPosition?.longitude
    ) {
        return null;
    }

    return (
        <View style={Style.Container.mapContainer as ViewStyle}>
            <MapView
                ref={mapRef}
                style={Style.Container.map as ViewStyle}
                initialRegion={{
                    latitude: appContext.userPosition?.latitude,
                    longitude: appContext.userPosition?.longitude,
                    latitudeDelta: 0.1,
                    longitudeDelta: 0.1,
                }}
                mapType={'hybrid'}>
                {orderDirectionsPath}
                {userPositionMarker}
                {orderLocationMarker}
            </MapView>
        </View>
    );
};
