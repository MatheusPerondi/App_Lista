import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

type ProductProps = {
    name: string;
    onRemove: () => void;
    onFinalize: () => void;
    isFinalized: boolean;
    style?: object; 
};

export function Product({ name, onRemove, onFinalize, style, isFinalized }: ProductProps) {
    return (
        <View style={[styles.container, style]}>
            
            <View style={styles.image}>
                
            <TouchableOpacity onPress={onFinalize} style={styles.finalizeButton}>
                
                <Image 
                    source={isFinalized
                        ? require("../../../../assets/LayerFinalizado.png")
                        : require("../../../../assets/Layer.png")}
                />
            
            </TouchableOpacity>
                
                

            </View>
            
            <View style={styles.nameCon}>

                <Text style={[styles.name, isFinalized && styles.namefinalized]}>{name}</Text>

            </View>
            
            
            <View style={styles.removeCon}>

                <TouchableOpacity onPress={onRemove} style={styles.removeButton}>
                
                    <Image 
                        source={require("../../../../assets/Layer2.png")}
                    />
            
                </TouchableOpacity>

            </View>
            
            
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#808080', 
        backgroundColor: '#F2F2F2', 
        shadowColor: '#000', 
        shadowOffset: { width: 0, height: 2 }, 
        shadowOpacity: 0.06, 
        shadowRadius: 8, 
        elevation: 2, 
        paddingTop: 12, 
        paddingRight: 8, 
        paddingBottom: 12, 
        paddingLeft: 12,
        marginBottom: 8,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: 345,
        height: 56,

    
    },
    name: {
        fontSize: 14,
        fontWeight: "400",
        color: "#262626",
        marginLeft: 8,
    },
    nameCon: {
        flexGrow: 1,
        width: 253,
        height: 20
    },
    removeCon: {
        display: "flex",
        width: 32,
        height: 32,
        paddingTop: 9,
        paddingRight: 9.522,
        paddingBottom: 9,
        paddingLeft: 10,
        justifyContent: "center",
        alignItems: "center",
        marginLeft: 8
    },
    image: {
        display: "flex",
        width: 24,
        height: 24,
        padding: 3.273,
        justifyContent: 'center',
        alignItems: "center",
    },
    finalizeButton: {

    },
    removeButton: {

    },
    namefinalized: {
        color: "#808080",
        fontSize: 14,
        fontWeight: "400",
        textDecorationLine: "line-through"
    }
});
