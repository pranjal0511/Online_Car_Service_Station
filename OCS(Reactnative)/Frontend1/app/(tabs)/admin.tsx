import React, { useEffect, useState } from 'react'
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  ScrollView
} from 'react-native'

/* ================= CONFIG ================= */
const BASE_URL = 'http://10.0.2.2:5000/api/admin'
const TOKEN = 'YOUR_ADMIN_TOKEN_HERE'

const headers = {
  Authorization: `Bearer ${TOKEN}`,
  'Content-Type': 'application/json'
}

/* ================= MAIN COMPONENT ================= */
const Admin = () => {
  const [stats, setStats] = useState(null)
  const [users, setUsers] = useState([])
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchAllData()
  }, [])

  const fetchAllData = async () => {
    try {
      const [statsRes, usersRes, bookingsRes] = await Promise.all([
        fetch(`${BASE_URL}/statistics`, { headers }),
        fetch(`${BASE_URL}/users`, { headers }),
        fetch(`${BASE_URL}/bookings`, { headers })
      ])

      const statsData = await statsRes.json()
      const usersData = await usersRes.json()
      const bookingsData = await bookingsRes.json()

      setStats(statsData?.data || {})
      setUsers(usersData?.data || [])
      setBookings(bookingsData?.data || [])
    } catch (error) {
      console.log('Admin API Error:', error)
    } finally {
      setLoading(false)
    }
  }

  /* ================= LOADING ================= */
  if (loading || !stats) {
    return (
      <ActivityIndicator
        size="large"
        color="#4B7BEC"
        style={{ marginTop: 60 }}
      />
    )
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Admin Dashboard</Text>
        <Text style={styles.subtitle}>Overview & Management</Text>
      </View>

      {/* Stats */}
      <View style={styles.statsRow}>
        <StatCard label="Users" value={stats.users || 0} />
        <StatCard label="Bookings" value={stats.bookings || 0} />
        <StatCard label="Revenue" value={`₹${stats.revenue || 0}`} />
      </View>

      {/* Users */}
      <Text style={styles.sectionTitle}>Users</Text>
      <FlatList
        data={users}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.cardRow}>
              <Text style={styles.cardTitle}>
                {item.firstName} {item.lastName}
              </Text>
              <View style={styles.roleBadge}>
                <Text style={styles.roleText}>
                  {item.role?.toUpperCase()}
                </Text>
              </View>
            </View>
            <Text style={styles.cardSubText}>{item.email}</Text>
          </View>
        )}
        scrollEnabled={false}
      />

      {/* Bookings */}
      <Text style={styles.sectionTitle}>Bookings</Text>
      <FlatList
        data={bookings}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>
              {item.vehicleDetails?.model} (
              {item.vehicleDetails?.number})
            </Text>

            <View style={styles.bookingRow}>
              <Text style={styles.status}>
                Status: {item.status}
              </Text>
              <Text style={styles.price}>
                ₹{item.totalPrice}
              </Text>
            </View>
          </View>
        )}
        scrollEnabled={false}
      />
    </ScrollView>
  )
}

/* ================= STAT CARD ================= */
const StatCard = ({ label, value }) => (
  <View style={styles.statCard}>
    <Text style={styles.statValue}>{value}</Text>
    <Text style={styles.statLabel}>{label}</Text>
  </View>
)

export default Admin

/* ================= STYLES ================= */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F6FA',
    padding: 16
  },

  header: {
    marginBottom: 20
  },

  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1E272E'
  },

  subtitle: {
    fontSize: 14,
    color: '#8395A7',
    marginTop: 4
  },

  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 25
  },

  statCard: {
    width: '32%',
    backgroundColor: '#4B7BEC',
    paddingVertical: 18,
    borderRadius: 14,
    alignItems: 'center',
    elevation: 6
  },

  statValue: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff'
  },

  statLabel: {
    marginTop: 6,
    color: '#EAF0FF',
    fontSize: 13
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1E272E',
    marginBottom: 12
  },

  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 14,
    marginBottom: 12,
    elevation: 3
  },

  cardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },

  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2F3542'
  },

  cardSubText: {
    marginTop: 6,
    color: '#57606F',
    fontSize: 13
  },

  roleBadge: {
    backgroundColor: '#EAF0FF',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20
  },

  roleText: {
    fontSize: 11,
    color: '#4B7BEC',
    fontWeight: 'bold'
  },

  bookingRow: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },

  status: {
    fontSize: 13,
    color: '#57606F'
  },

  price: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#2ED573'
  }
})
