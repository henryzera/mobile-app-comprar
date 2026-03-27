import { TouchableOpacity, Text, TouchableOpacityProps } from "react-native"
import { styles } from "./styles"

type PropsButton = TouchableOpacityProps & {
    title: string
}

export function Button({title, ...rest}: PropsButton){
    return (
        <TouchableOpacity style={styles.container} {...rest}>
            <Text style={styles.title}>{title}</Text>
        </TouchableOpacity>
    )
}