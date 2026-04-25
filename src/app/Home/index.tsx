import { useState, useEffect } from 'react';
import { View, Image } from 'react-native';

import { styles } from './styles';

import { TouchableOpacity, Text, FlatList, Alert } from 'react-native';

import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { Filter } from '@/components/Filter'
import { Item } from '@/components/Item';

import { FilterStatus } from '@/types/FilterStatus';
import { itemsStorage, type ItemStorage } from '@/storage/itemsStorage';

const FILTER_STATUS: FilterStatus[] = [FilterStatus.PENDING, FilterStatus.DONE]

export default function Home() {
  const [filter, setFilter] = useState(FilterStatus.PENDING)
  const [description, setDescription] = useState("")
  const [items, setItems] = useState<ItemStorage[]>([])

  async function handleAdd(){
    const trimmedDescription = description.trim()

    if (!trimmedDescription) {
      return Alert.alert("Adicionar", "Informe a descrição para adicionar.")
    }

    const newItem = {
      id : Math.random().toString(36).substring(2),
      description: trimmedDescription,
      status: FilterStatus.PENDING
    }

    await itemsStorage.add(newItem)

    setDescription("")

    await itemsByStatus(FilterStatus.PENDING)

    if(filter !== FilterStatus.PENDING)
      setFilter(FilterStatus.PENDING)

    Alert.alert("Adicionado", `Adicionado ${description}`)
  }

  async function itemsByStatus(status: FilterStatus) {
    try {
      const response = await itemsStorage.getByStatus(status)
      setItems(response)
    } catch (error) {
      console.log(error)
      Alert.alert("Erro", "Não foi possível filtrar os itens.")
    }
  }

  async function handleRemove(id: string){
    try {
      await itemsStorage.remove(id)
      await itemsByStatus(filter)
    } catch (error) {
      console.log(error)
      Alert.alert("Remover", "Não foi possível remover o item.")
    }
  }

  function handleClear(){
    Alert.alert("Limpar","Deseja remover todos os itens?", [
      { text: "Não", style: "cancel" },
      { text: "Sim", onPress: () => onClear()}
    ])
  }

  async function onClear(){
    try {
      await itemsStorage.clear()
      setItems([])
    } catch (error) {
      console.log(error)
      Alert.alert("Erro", "Não foi possível remover todos os itens")
    }
  }

  async function handleStatus(id: string){
    try {
      const updatedFilter = filter === FilterStatus.DONE
        ? FilterStatus.PENDING
        : FilterStatus.DONE
      
      const response = await itemsStorage.toggleStatus(id)
      setItems(response)
      setFilter(updatedFilter)
    } catch (error) {
      console.log(error)
      Alert.alert("Erro", "Não foi possível alterar o status do item")
    }
  }

  useEffect(() => {
    itemsByStatus(filter)
  }, [filter])

  return (
    <View style={styles.container}>
      <Image source={require('@/assets/logo.png')} style={styles.logo}/>

      <View style={styles.form}>
        <Input 
          placeholder='O que você precisa comprar?'
          onChangeText={setDescription}
          value={description}/>
        <Button 
          title="Adicionar"
          onPress={handleAdd}/>
      </View>
      <View style={styles.content}>
        <View style={styles.header}>
          {FILTER_STATUS.map((status) => (
            <Filter 
              key={status}
              status={status}
              isActive={status === filter}
              onPress={() => setFilter(status)}/>
          ))}
          <TouchableOpacity 
            style={styles.clearButton}
            onPress={handleClear}>
            <Text style={styles.clearText}>Limpar</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={items}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Item 
              data={item}
              onStatus={() => handleStatus(item.id)}
              onRemove={() => handleRemove(item.id)}
            />
          )}
          ItemSeparatorComponent={() => <View style={styles.separator}/>}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={() => (
            <Text style={styles.empty}>Nenhum item aqui.</Text>
          )}
        />
      </View>
    </View>
  );
}


