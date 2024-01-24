import { Animated } from "react-native"
import { useRef, useEffect } from "react"


export const FadeInView: React.FC<{ duration?: number , children: React.ReactNode }> = ({ children, duration=1500 }) => {
    const fadeAnim = useRef(new Animated.Value(0)).current;
    useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: duration!,
            useNativeDriver: true
        }).start()
    }, [duration, fadeAnim])
    return <Animated.View>
        {children}
    </Animated.View>
}