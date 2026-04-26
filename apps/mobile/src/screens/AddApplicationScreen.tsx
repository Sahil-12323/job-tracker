import React, { useState } from 'react';
import { Alert, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { api } from '../services/api';

export function AddApplicationScreen() {
  const [form, setForm] = useState({
    companyName: '',
    role: '',
    jobLink: '',
    status: 'Applied',
    appliedDate: new Date().toISOString().slice(0, 10),
    notes: '',
    resumeVersion: '',
    followUpDate: ''
  });

  const onSubmit = async () => {
    await api.createApplication({ ...form, source: 'manual' });
    Alert.alert('Saved', 'Application added.');
  };

  const fields = [
    ['companyName', 'Company Name'],
    ['role', 'Role'],
    ['jobLink', 'Job Link'],
    ['status', 'Status'],
    ['appliedDate', 'Applied Date (YYYY-MM-DD)'],
    ['notes', 'Notes'],
    ['resumeVersion', 'Resume Version'],
    ['followUpDate', 'Follow-up Date (YYYY-MM-DD)']
  ] as const;

  return (
    <ScrollView contentContainerStyle={{ padding: 16, gap: 12 }}>
      <Text style={{ fontSize: 24, fontWeight: '700' }}>Add Application</Text>
      {fields.map(([key, label]) => (
        <View key={key}>
          <Text style={{ marginBottom: 6 }}>{label}</Text>
          <TextInput
            value={(form as any)[key]}
            onChangeText={(value) => setForm((prev) => ({ ...prev, [key]: value }))}
            style={{ borderWidth: 1, borderColor: '#d1d5db', borderRadius: 8, padding: 10 }}
          />
        </View>
      ))}

      <TouchableOpacity onPress={onSubmit} style={{ backgroundColor: '#111827', borderRadius: 8, padding: 12 }}>
        <Text style={{ color: 'white', textAlign: 'center', fontWeight: '700' }}>Save</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
