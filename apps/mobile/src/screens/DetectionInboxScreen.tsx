import React, { useEffect, useState } from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { DetectionModal } from '../components/DetectionModal';
import { api } from '../services/api';
import { DetectionEvent } from '../types/application';

export function DetectionInboxScreen() {
  const [events, setEvents] = useState<DetectionEvent[]>([]);
  const [selected, setSelected] = useState<DetectionEvent | undefined>();

  const load = async () => setEvents(await api.getDetectionEvents());

  useEffect(() => {
    load();
  }, []);

  return (
    <View style={{ flex: 1, padding: 16, gap: 12 }}>
      <Text style={{ fontSize: 24, fontWeight: '700' }}>Detection Inbox</Text>
      <FlatList
        data={events}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={{ borderWidth: 1, borderColor: '#e5e7eb', borderRadius: 8, padding: 12, marginBottom: 8 }}
            onPress={() => setSelected(item)}
          >
            <Text style={{ fontWeight: '700' }}>{item.parsed.companyName}</Text>
            <Text>{item.parsed.role}</Text>
            <Text style={{ color: '#6b7280' }}>{item.source}</Text>
          </TouchableOpacity>
        )}
      />

      <DetectionModal
        visible={Boolean(selected)}
        event={selected}
        onClose={() => setSelected(undefined)}
        onAction={async (action) => {
          if (!selected) return;
          await api.resolveDetection(selected.id, action);
          setSelected(undefined);
          await load();
        }}
      />
    </View>
  );
}
