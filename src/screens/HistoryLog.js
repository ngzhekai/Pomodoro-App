import React, { useContext } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import LogContext from '../contexts/LogContext';
import Layout from '../components/Layout';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const HistoryLog = () => {
    const {
        historyList,
        historyTitle,
        textList,
        completedPomoText,
        completedSection,
    } = styles;

    const { logs } = useContext(LogContext);
    const { pomoCount } = useContext(LogContext);

    const renderLogItem = ({ item }) => {
        const formattedDatetime = new Date(item.datetime).toLocaleString('en-GB', {
            day: 'numeric',
            month: 'numeric',
            year: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
        });

        return (
            <Text key={item.id} style={textList}>[{formattedDatetime}] - {item.message}</Text>
        );
    };

    return (
        <Layout>
        <View style={completedSection}>
        <MaterialCommunityIcons name={pomoCount ? 'trophy': 'trophy-broken'}  size={70} color="black" />
        <Text style={completedPomoText}>PomoTimer Completed : {pomoCount}</Text>
        </View>
        <View style={historyList}>
        <Text style={historyTitle}>History</Text>
        <FlatList
        data={logs}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderLogItem }
        />
        </View>
        </Layout>
    );
}

const styles = StyleSheet.create({
    historyList: {
        marginVertical: 30,
    },
    historyTitle: {
        fontWeight: 'bold',
        fontSize: 20,
        textTransform: 'capitalize',
        paddingVertical: 15,
    },
    textList: {
        paddingBottom: 15,
        fontSize: 10,
    },
    completedPomoText: {
        fontSize: 18,
        fontWeight: 'bold',
        paddingTop: 25,
    },
    completedSection: {
        marginTop: 60,
        alignItems: 'center',
    },
});

export default HistoryLog;
