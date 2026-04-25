import { View, Text, TouchableOpacity } from "react-native"
import { Trash2 } from "lucide-react-native"

import { styles } from "./styles"
import { StatusIcon } from "@/components/StatusIcon"
import { FilterStatus } from "@/types/FilterStatus"

import { type ItemStorage } from "@/storage/itemsStorage"

type Props = {
    data: ItemStorage
    onStatus: () => void
    onRemove: () => void
}

export function Item({ data, onStatus, onRemove }: Props){
    return (
        <View style={styles.container}>
            <TouchableOpacity activeOpacity={0.8} onPress={onStatus}>
                <StatusIcon status={data.status}></StatusIcon>
            </TouchableOpacity>
            <Text style={styles.description}>{data.description}</Text>
            <TouchableOpacity onPress={onRemove}>
                <Trash2 size={18} color="#828282"/>
            </TouchableOpacity>
        </View>
    )
}
