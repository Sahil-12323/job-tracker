import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { JobApplication, ApplicationStatus } from '../types/application';

const statuses: ApplicationStatus[] = ['Applied', 'Screening', 'Interview', 'Offer', 'Rejected'];

export function KanbanBoard({
  items,
  onMove
}: {
  items: JobApplication[];
  onMove: (id: string, status: ApplicationStatus) => void;
}) {
  return (
    <ScrollView horizontal contentContainerStyle={styles.container}>
      {statuses.map((status) => {
        const cards = items.filter((item) => item.status === status);
        return (
          <View key={status} style={styles.column}>
            <Text style={styles.title}>{status}</Text>
            {cards.map((card) => (
              <TouchableOpacity
                key={card.id}
                style={styles.card}
                onLongPress={() => {
                  const next = statuses[(statuses.indexOf(card.status) + 1) % statuses.length];
                  onMove(card.id, next);
                }}
              >
                <Text style={styles.company}>{card.companyName}</Text>
                <Text>{card.role}</Text>
                <Text style={styles.date}>{card.appliedDate}</Text>
              </TouchableOpacity>
            ))}
          </View>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, gap: 12 },
  column: {
    width: 280,
    backgroundColor: '#f3f4f6',
    borderRadius: 12,
    padding: 12,
    gap: 8
  },
  title: { fontWeight: '700', fontSize: 16 },
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    shadowColor: '#111827',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2
  },
  company: { fontWeight: '700' },
  date: { fontSize: 12, color: '#6b7280', marginTop: 6 }
});
