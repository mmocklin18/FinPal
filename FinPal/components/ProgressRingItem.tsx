import { AnimatedCircularProgress} from 'react-native-circular-progress';
import { View, Text, StyleSheet } from 'react-native';
import { ProgressRing } from '../types/progressring'

type ProgressRingProps = {
  data: ProgressRing
};

export default function ProgressRingItem({data}: ProgressRingProps) {
  console.log("Rendering ring:", {
  category: data.category,
  color: data.color,
  type: typeof data.color,
  percentage: data.percentage,
});
  return (
    <View style={styles.wrapper}>
      <Text style={styles.topText}>{data.category.replaceAll('_',' ')}</Text>
      <AnimatedCircularProgress
        size={120}
        width={15}
        fill={data.percentage}
        tintColor={data.percentage >= 100 ? '#8B0000' : data.color}
        backgroundColor="#ffffff"
        lineCap="butt"
        rotation={0}
        style={styles.ring}
        duration={600}
      >
        {() => (
          <Text style={styles.icon}>{data.label}</Text>
        )}
      </AnimatedCircularProgress>
      <Text style={styles.bottomText}>
        {`$${data.spent} / $${data.budget}`}
      </Text>
      <Text>
        {`$${(data.budget - data.spent).toFixed(0)} remaining`}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    padding: 16,
  },
  icon: {
    fontSize: 40,
    fontWeight: '600',
  },
  topText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 8,
  },
  bottomText: {
    marginTop: 10,
    fontWeight:'500',
    color: '#4B5563',
    fontFamily: "Manrope",
  },
  ring: {
    shadowColor: '#000',
    shadowOffset: { 
      width: 0,
      height: 5
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 4,
  }
});
