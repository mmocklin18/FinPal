import { AnimatedCircularProgress} from 'react-native-circular-progress';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import  ProgressRingItem from './ProgressRingItem';
import { ProgressRing } from '../types/progressring'

type ProgressRingsProps = {
    data: ProgressRing[];
}

export default function ProgressRings({data} : ProgressRingsProps) {
    return(
        <FlatList
        data={data}
        style={{
            flexGrow: 0,
            backgroundColor:"#d8e1e9",
            paddingVertical:10
         }}
        renderItem={({ item }) =>
            <View style={
                { 
                alignItems: 'center',
                marginRight: 12,
                marginLeft: 12
                }
            }>
            <ProgressRingItem data={item} />
            </View>}
        keyExtractor={(item) => item.category}
        horizontal={true}
        >
        </FlatList>
    );

}