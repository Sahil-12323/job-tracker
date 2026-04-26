import React, { useEffect, useState } from 'react';
import { RefreshControl, ScrollView, Text } from 'react-native';
import { KanbanBoard } from '../components/KanbanBoard';
import { api } from '../services/api';
import { JobApplication } from '../types/application';

export function KanbanScreen() {
  const [items, setItems] = useState<JobApplication[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const load = async () => {
    setRefreshing(true);
    try {
      setItems(await api.getApplications());
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={load} />}>
      <Text style={{ paddingHorizontal: 16, paddingTop: 16, fontSize: 24, fontWeight: '700' }}>JobTrackr AI</Text>
      <Text style={{ paddingHorizontal: 16, color: '#6b7280' }}>Long-press cards to move status quickly.</Text>
      <KanbanBoard
        items={items}
        onMove={async (id, status) => {
          await api.updateStatus(id, status);
          await load();
        }}
      />
    </ScrollView>
  );
}
