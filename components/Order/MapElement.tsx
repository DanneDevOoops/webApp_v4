// import React, { FC, ReactElement } from 'react';
// import { View, ViewStyle } from 'react-native';
// import * as Style from '../../assets/styles';
// import MapView from 'react-native-maps';
// import { AppContext } from '../../interfaces/AppContext';
//
// /**
//  * MapElement component
//  *
//  * @param appContext
//  * @param userPositionMarker
//  * @param orderLocationMarker
//  * @param orderDirectionsPath
//  * @param mapRef
//  * @constructor
//  */
// const MapElement: FC<{
//     appContext: AppContext;
//     userPositionMarker: React.ReactElement | null;
//     orderLocationMarker: React.ReactElement | null;
//     orderDirectionsPath: React.ReactElement | null;
//     mapRef: never;
// }> = ({
//     appContext,
//     userPositionMarker,
//     orderLocationMarker,
//     orderDirectionsPath,
//     mapRef,
// }): ReactElement | undefined => {
//     if (
//         !appContext.userPosition?.latitude ||
//         !appContext.userPosition?.longitude
//     ) {
//         return;
//     }
//
//     return (
//         <View style={Style.Container.mapContainer as ViewStyle}>
//             <MapView
//                 ref={mapRef}
//                 style={Style.Container.map as ViewStyle}
//                 initialRegion={{
//                     latitude: appContext.userPosition?.latitude,
//                     longitude: appContext.userPosition?.longitude,
//                     latitudeDelta: 0.1,
//                     longitudeDelta: 0.1,
//                 }}
//                 mapType={'hybrid'}>
//                 {orderDirectionsPath}
//                 {userPositionMarker}
//                 {orderLocationMarker}
//             </MapView>
//         </View>
//     );
// };
