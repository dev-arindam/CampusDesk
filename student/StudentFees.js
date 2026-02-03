import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    FlatList,
    TouchableOpacity
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const COLORS = {
    primary: "#8b5cf6",
    secondary: "#22d3ee",
    background: "#020617",
    card: "#1e293b",
    paid: "#22c55e",
    pending: "#f87171",
    textLight: "#fff",
    textDim: "#c7d2fe"
};

const feesData = [
    { month: 'January', amount: 5000, status: 'Paid' },
    { month: 'February', amount: 5000, status: 'Pending' },
    { month: 'March', amount: 5000, status: 'Paid' },
    { month: 'April', amount: 5000, status: 'Pending' },
    { month: 'May', amount: 5000, status: 'Paid' },
    { month: 'June', amount: 5000, status: 'Pending' },
];

export default function StudentFees({ onBack }) {

    const renderFeeItem = ({ item }) => {
        const statusColor =
            item.status === 'Paid' ? COLORS.paid : COLORS.pending;

        return (
            <View style={styles.feeCard}>
                <View>
                    <Text style={styles.month}>{item.month}</Text>
                    <Text style={styles.amount}>₹ {item.amount}</Text>
                </View>

                <View style={styles.cardRight}>
                    <View style={[styles.statusBadge, { backgroundColor: statusColor }]}>
                        <Text style={styles.statusText}>{item.status}</Text>
                    </View>

                    {item.status === 'Pending' && (
                        <TouchableOpacity style={styles.payButton} activeOpacity={0.85}>
                            <Text style={styles.payText}>Pay Now</Text>
                        </TouchableOpacity>
                    )}
                </View>
            </View>
        );
    };

    return (
        <SafeAreaView style={styles.container}>

            {/* HERO HEADER */}
            <LinearGradient
                colors={["#0f172a", "#1e293b", "#312e81"]}
                style={styles.hero}
            >
                <TouchableOpacity onPress={onBack} style={styles.backBtn}>
                    <Ionicons name="arrow-back" size={22} color="#fff" />
                </TouchableOpacity>

                {/* Hero Center */}
                <View style={styles.heroCenter}>
                    <View style={styles.heroIcon}>
                        <Ionicons name="wallet" size={34} color="#fff" />
                    </View>

                    <Text style={styles.heroTitle}>Fees Dashboard</Text>
                    <Text style={styles.heroSub}>
                        Track & manage your monthly payments
                    </Text>

                    {/* Stats Row */}
                    <View style={styles.heroStats}>
                        <View style={styles.statBox}>
                            <Text style={styles.statValue}>₹30,000</Text>
                            <Text style={styles.statLabel}>Total</Text>
                        </View>

                        <View style={styles.statBox}>
                            <Text style={styles.statValue}>3</Text>
                            <Text style={styles.statLabel}>Paid</Text>
                        </View>

                        <View style={styles.statBox}>
                            <Text style={styles.statValue}>3</Text>
                            <Text style={styles.statLabel}>Pending</Text>
                        </View>
                    </View>
                </View>
            </LinearGradient>

            {/* LIST */}
            <FlatList
                data={feesData}
                renderItem={renderFeeItem}
                keyExtractor={(item) => item.month}
                contentContainerStyle={styles.list}
                showsVerticalScrollIndicator={false}
            />

            {/* FAB */}
            <TouchableOpacity style={styles.fab} activeOpacity={0.85}>
                <Ionicons name="add" size={26} color="#fff" />
            </TouchableOpacity>

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background
    },

    hero: {
  paddingTop: 40,
  paddingBottom: 30,
  paddingHorizontal: 20,
  borderBottomLeftRadius: 36,
  borderBottomRightRadius: 36,
},

backBtn: {
  position: "absolute",
  top: 40,
  left: 20,
},

heroCenter: {
  alignItems: "center",
  marginTop: 20,
},

heroIcon: {
  width: 70,
  height: 70,
  borderRadius: 35,
  backgroundColor: "rgba(255,255,255,0.2)",
  alignItems: "center",
  justifyContent: "center",
  marginBottom: 12,
},

heroTitle: {
  color: "#fff",
  fontSize: 22,
  fontWeight: "800",
},

heroSub: {
  color: "#e0e7ff",
  fontSize: 13,
  marginTop: 4,
},

heroStats: {
  flexDirection: "row",
  marginTop: 16,
},

statBox: {
  backgroundColor: "rgba(255,255,255,0.18)",
  paddingVertical: 10,
  paddingHorizontal: 14,
  borderRadius: 14,
  marginHorizontal: 6,
  alignItems: "center",
},

statValue: {
  color: "#fff",
  fontWeight: "800",
  fontSize: 16,
},

statLabel: {
  color: "#e0e7ff",
  fontSize: 11,
  marginTop: 2,
},

    list: {
        padding: 16,
        paddingBottom: 100
    },

    feeCard: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: COLORS.card,
        padding: 20,
        borderRadius: 18,
        marginBottom: 14,
        elevation: 6
    },

    month: {
        color: COLORS.textLight,
        fontSize: 18,
        fontWeight: '700'
    },

    amount: {
        color: COLORS.textDim,
        fontSize: 15,
        marginTop: 6
    },

    cardRight: {
        justifyContent: 'center',
        alignItems: 'flex-end'
    },

    statusBadge: {
        borderRadius: 12,
        paddingHorizontal: 12,
        paddingVertical: 4,
        marginBottom: 8
    },

    statusText: {
        color: '#fff',
        fontWeight: '700'
    },

    payButton: {
        backgroundColor: COLORS.primary,
        paddingHorizontal: 14,
        paddingVertical: 7,
        borderRadius: 14
    },

    payText: {
        color: '#fff',
        fontWeight: '700'
    },

    fab: {
        position: 'absolute',
        right: 20,
        bottom: 20,
        backgroundColor: COLORS.primary,
        width: 58,
        height: 58,
        borderRadius: 29,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 10,
    },
});