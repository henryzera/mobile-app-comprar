import { View, Image } from 'react-native';
import { styles } from './styles';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';

export default function Home() {
  return (
    <View style={styles.container}>
      <Image source={require('@/assets/logo.png')}/>

      <View style={styles.form}>
        <Input placeholder='O que você precisa comprar?'/>
        <Button title="Entrar"/>
      </View>
    </View>
  );
}


