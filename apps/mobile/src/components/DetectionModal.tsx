import React from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { DetectionEvent } from '../types/application';

export function DetectionModal({
  visible,
  event,
  onClose,
  onAction
}: {
  visible: boolean;
  event?: DetectionEvent;
  onClose: () => void;
  onAction: (action: 'add' | 'edit' | 'ignore') => void;
}) {
  if (!event) return null;

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.card}>
          <Text style={styles.title}>Smart detection</Text>
          <Text style={styles.text}>
            Detected from {event.source}: {event.parsed.companyName} – {event.parsed.role}
          </Text>
          <View style={styles.row}>
            {['add', 'edit', 'ignore'].map((action) => (
              <TouchableOpacity key={action} style={styles.btn} onPress={() => onAction(action as any)}>
                <Text style={styles.btnText}>{action.toUpperCase()}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: { flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0,0,0,0.35)' },
  card: { backgroundColor: 'white', borderTopLeftRadius: 18, borderTopRightRadius: 18, padding: 16, gap: 12 },
  title: { fontSize: 18, fontWeight: '700' },
  text: { color: '#374151' },
  row: { flexDirection: 'row', gap: 8 },
  btn: { flex: 1, backgroundColor: '#111827', borderRadius: 8, padding: 10, alignItems: 'center' },
  btnText: { color: 'white', fontWeight: '700' }
});
