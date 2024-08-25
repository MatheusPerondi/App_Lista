import { useState } from "react";
import { StyleSheet, TextInput, TouchableOpacity, View, Text, FlatList, Alert, Image } from "react-native";
import { Product } from "./components/Product";

export function Home() {
    const [products, setProducts] = useState<string[]>([]);
    const [productName, setProductName] = useState('');
    const [finalizados, setFinalizados] = useState<string[]>([]);

    function handleProductAdd() {
        if (products.includes(productName)) {
            return Alert.alert('Produto já cadastrado!', 'Já existe um produto com esse nome.');
        }
        setProducts(prevState => [...prevState, productName]);
        setProductName('');
    }

    function handleProductRemove(name: string) {
        Alert.alert('Remover', `Deseja remover o produto ${name}?`, [
            {
                text: 'Sim',
                onPress: () => {
                    setProducts(prevState => {
                        const newProducts = prevState.filter(product => product !== name);
                        
                        
                        if (finalizados.includes(name)) {
                            setFinalizados(prevFinalizados => prevFinalizados.filter(product => product !== name));
                        }
                        
                        return newProducts; 
                    });
                }
            },
            {
                text: 'Não',
                style: 'cancel'
            }
        ]);
    }

    function handleProductFinalize(name: string){
        setFinalizados(prevState => 
            prevState.includes(name)
                ? prevState.filter(productName => productName !== name)
                : [...prevState, name]
        );

    }

    return (
        <View style={styles.container}>
            
            <View style={styles.listaCompras}>
                <Text style={styles.title}>Lista de Compras</Text>
            </View>
            

            <View style={styles.form}>
                
                <TextInput
                    style={styles.input}
                    placeholder="Adicione um novo produto"
                    placeholderTextColor='#808080'
                    keyboardType="default"
                    value={productName}
                    onChangeText={setProductName}
                />
                <TouchableOpacity style={styles.button} onPress={handleProductAdd}>
                    <Text style={styles.textbutton}>
                        <Image 
                            source={require("../../assets/plus.png")}
                            style={styles.plus}
                        />
                    </Text>
                </TouchableOpacity>
            
            </View>

            <View style={styles.produtoscon}>
                
                <View style={styles.counterContainer}>
                    
                    <View style={styles.viewProduto}>
                    
                        <Text style={styles.counterText}>Produtos </Text>
                        <Text style={styles.counterProduct}>{products.length}</Text>
                    
                    </View>
                    
                    <View style={styles.viewFinalizados}>
                        
                        <Text style={styles.finalizados}>Finalizados</Text>
                        <Text style={styles.counterFinalizados}>{finalizados.length} </Text>
                    
                    </View>
                    
                
                </View>
                
                <FlatList
                    data={products}
                    keyExtractor={(item) => item}
                    renderItem={({ item }) => (
                            <Product 
                            name={item} 
                            onRemove={() => handleProductRemove(item)}
                            onFinalize={() => handleProductFinalize(item)}
                            isFinalized={finalizados.includes(item)} 
                            style={styles.product}
                        />
                    )}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={products.length > 0 ? styles.listContainer : {}}
                    ListEmptyComponent={() => (
                        
                        <View style={styles.emptyContainer}>
                            <Image 
                                source={require("../../assets/list.png")}
                                style={styles.image}
                            />

                            <Text style={styles.listEmpty}>
                                Você ainda não tem produtos na lista de compra
                            </Text>

                            <Text style={styles.listEmptyTextSecond}>
                                Adicione produtos e organize sua lista de compras
                            </Text>
                        
                        </View>
                    )}

                    

                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        flexShrink: 0,
    },
    listaCompras: {
        width: "100%",
        height: 173,
        backgroundColor: "#7A4A9E",
        justifyContent: "center",
        alignItems: "center",
    },
    title: {
        color: "#F2F2F2",
        textAlign: "center",
        marginTop: 4,
        fontSize: 20,
        fontStyle: "normal",
        fontWeight: "700",
        lineHeight: 140,
    },
    form: {
        height: 54,
        flexDirection: "row",
        alignContent: 'center',
        bottom: 30,
    },
    input: {
        flex: 1,
        padding: 16,
        flexGrow: 1,
        borderRadius: 6,
        borderWidth: 1,
        borderColor: '#7A4A9E',
        backgroundColor: '#F2F2F2',   
        marginLeft: 24,
        marginRight: 5,
        marginBottom: 10,
        width: '100%',
        height: 54,
    },
    button: {
        display: "flex",
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 6,
        backgroundColor: '#31C667',
        marginRight: 24,
        width: 52,
        height: 52,
        flexDirection: 'row'
    },
    plus: {
        display: "flex",
        padding: 18,
        justifyContent: "center",
        alignItems: "center",
        gap: 8,
    },
    textbutton: {
        color: '#F2F2F2',
        fontWeight: 'bold',
    },
    produtoscon: {
        marginLeft: 24,
        marginBottom: 33,
        color: '#31C667',
        fontSize: 14,
        fontStyle: 'normal',
        fontWeight: 'bold',
        display: "flex",

    },
    productItem: {
        padding: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#F2F2F2',
    },
    removeButton: {
        color: '#FF0000',
    },
    listEmpty: {
        fontSize: 14,
        color: "#808080",
        textAlign: "center",
        fontWeight: "700",

    },
    listEmptyTextSecond: {
        fontSize: 14,
        color: "#808080",
        textAlign: "center",
    },
    counterContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-end",
        width: 345,
        height: 19,

    },
    emptyContainer: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        paddingTop: 48,
        paddingBottom: 48,
        borderTopWidth: 1,
        borderTopColor: "#D9D9D9",
        marginTop: 20,
        width: 345,
        height: 208,
        marginRight: 20

    },
    counterText: {
        fontSize: 14,
        fontStyle: "normal",
        fontWeight: "700",
        color: "#31C667",


    },
    counterProduct: {
        borderRadius: 999,
        backgroundColor: "#D9D9D9",
        justifyContent: "center",
        alignItems: "center",
        gap: 10,
        paddingVertical: 2,
        paddingHorizontal: 8,
        fontSize: 12,
        fontWeight: "700",
        color: "#333333",
        
    },
    finalizados: {
        fontSize: 14,
        fontStyle: "normal",
        fontWeight: "700",
        color: "#7A4A9E",
    },
    counterFinalizados: {
        borderRadius: 999,
        backgroundColor: "#D9D9D9",
        justifyContent: "center",
        alignItems: "center",
        gap: 10,
        paddingVertical: 2,
        paddingHorizontal: 5,
        marginLeft: 0,
        fontSize: 12,
        fontWeight: "700",
        color: "#333333",
    },
    viewProduto: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
        flex: 1,

    },
    viewFinalizados: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
    },
    image: {
        width: 56,
        height: 56,
        marginBottom: 16,
        justifyContent: "center",
        alignItems: "center"
    },
    listContainer: {
        marginTop: 20,
        justifyContent: "center",
    },
    listProducts: {
        
    },
    product: {
        
    }
    
});
