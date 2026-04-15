import { View, TouchableOpacity, TouchableOpacityProps, Text} from "react-native"
import { styles } from "./styles"
import { FilterStatus } from "@/types/FilterStatus"
import { StatusIcon } from "@/components/StatusIcon"

type Props = TouchableOpacityProps & {
    status: FilterStatus,
    isActive: boolean
}

export function Filter({ status, isActive, ...rest}: Props){
    return (
        <TouchableOpacity
            style={styles.container}
            activeOpacity={0.48}
            {...rest}
        >
            <StatusIcon status={status}/>
            <Text style={[styles.title, {opacity: isActive ? 1 : 0.5}]}>
                {status === FilterStatus.DONE ? "Comprados" : "Pendentes"}
            </Text>
        </TouchableOpacity>
    )
}
