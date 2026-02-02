import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, TouchableOpacity, Alert } from "react-native";
import { TextInput, Button, Card, ActivityIndicator } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { DatePickerModal } from "react-native-paper-dates";
import { useRouter } from "expo-router";

export default function Bookings() {
  const [step, setStep] = useState(1);

  const [services, setServices] = useState<any[]>([]);
  const [stations, setStations] = useState<any[]>([]);
  const [selectedService, setSelectedService] = useState<any>(null);
  const [selectedStation, setSelectedStation] = useState<any>(null);
  const [scheduledDate, setScheduledDate] = useState("");
  const [vehicleModel, setVehicleModel] = useState("");
  const [vehicleNumber, setVehicleNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
    const router = useRouter();

  const [calendarVisible, setCalendarVisible] = useState(false);

  // Fetch services
  const fetchServices = async () => {
    setLoading(true);
    try {
      const userDataString = await AsyncStorage.getItem("@user_data");
      if (!userDataString) throw new Error("User not logged in");
      const userData = JSON.parse(userDataString);
      const token = userData.token;

      console.log(" userData@@@@", userData)

      const response = await fetch("http://10.18.113.132:5000/api/services", {
        method: "GET",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Failed to fetch services");
      setServices(data.data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch stations
  const fetchStations = async () => {
    setLoading(true);
    try {
      const userDataString = await AsyncStorage.getItem("@user_data");
      if (!userDataString) throw new Error("User not logged in");
      const userData = JSON.parse(userDataString);
      const token = userData.token;

      const response = await fetch("http://10.18.113.132:5000/api/stations", {
        method: "GET",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Failed to fetch stations");
      setStations(data.data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
    fetchStations();
  }, []);

  // Create booking
  const createBooking = async () => {
    setLoading(true);
    try {
      const userDataString = await AsyncStorage.getItem("@user_data");
      if (!userDataString) throw new Error("User not logged in");
      const userData = JSON.parse(userDataString);
      const token = userData.token;

      const response = await fetch("http://10.0.2.2:5000/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          serviceId: selectedService.id,
          stationId: selectedStation.id,
          scheduledDate,
          vehicleDetails: { model: vehicleModel, number: vehicleNumber },
          totalPrice: selectedService?.price || 0,
        }),
      });

      const data = await response.json();
      console.log("@@data",data)
      if (!response.ok) throw new Error(data.message || "Failed to create booking");
      Alert.alert("Success", "Booking created successfully!");
      setStep(1);
      setSelectedService(null);
      setSelectedStation(null);
      setScheduledDate("");
      setVehicleModel("");
      setVehicleNumber("");
      router.replace("/(tabs)/home");
    } catch (err: any) {
      Alert.alert("Error", err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading)
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#2196f3" />
      </View>
    );

  const StepIndicator = () => (
    <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 20 }}>
      {[1, 2, 3, 4, 5].map((s) => (
        <View
          key={s}
          style={{
            width: 40,
            height: 40,
            borderRadius: 20,
            backgroundColor: step >= s ? "#2196f3" : "#ccc",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ color: "#fff", fontWeight: "bold" }}>{s}</Text>
        </View>
      ))}
    </View>
  );

  return (
    <ScrollView style={{ flex: 1, padding: 20, backgroundColor: "#f5f5f5" }}>
      <StepIndicator />
      {error ? <Text style={{ color: "red" }}>{error}</Text> : null}

      {/* Step 1: Select Service */}
      {step === 1 && (
        <View>
          <Text style={{ fontSize: 20, marginBottom: 10 }}>Select a Service</Text>
          {services.map((item) => (
            <Card
              key={item.id}
              style={{
                marginBottom: 10,
                backgroundColor: selectedService?.id === item.id ? "#2196f3" : "#fff",
              }}
              onPress={() => setSelectedService(item)}
            >
              <Card.Content>
                <Text style={{ fontSize: 16 }}>{item.name}</Text>
                <Text style={{ color: "#555" }}>{item.description}</Text>
                <Text style={{ fontWeight: "bold", marginTop: 5 }}>Price: ₹{item.price}</Text>
              </Card.Content>
            </Card>
          ))}
          <Button mode="contained" disabled={!selectedService} onPress={() => setStep(2)}>
            Next
          </Button>
        </View>
      )}

      {/* Step 2: Select Station */}
      {step === 2 && (
        <View>
          <Text style={{ fontSize: 20, marginBottom: 10 }}>Select a Station</Text>
          {stations.map((item) => (
            <Card
              key={item.id}
              style={{
                marginBottom: 10,
                backgroundColor: selectedStation?.id === item.id ? "#2196f3" : "#fff",
              }}
              onPress={() => setSelectedStation(item)}
            >
              <Card.Content>
                <Text style={{ fontSize: 16 }}>{item.name}</Text>
                <Text style={{ color: "#555" }}>{item.location}</Text>
              </Card.Content>
            </Card>
          ))}
          <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 10 }}>
            <Button mode="outlined" onPress={() => setStep(1)}>
              Back
            </Button>
            <Button mode="contained" disabled={!selectedStation} onPress={() => setStep(3)}>
              Next
            </Button>
          </View>
        </View>
      )}

      {/* Step 3: Select Date */}
      {step === 3 && (
        <View>
          <Text style={{ fontSize: 20, marginBottom: 10 }}>Select Date</Text>
          <TouchableOpacity onPress={() => setCalendarVisible(true)}>
            <TextInput
              label="Scheduled Date"
              value={scheduledDate}
              editable={false}
              pointerEvents="none"
              mode="outlined"
              style={{ marginBottom: 20 }}
            />
          </TouchableOpacity>

          <DatePickerModal
            locale="en"
            mode="single"
            visible={calendarVisible}
            onDismiss={() => setCalendarVisible(false)}
            date={scheduledDate ? new Date(scheduledDate) : undefined}
            onConfirm={(params) => {
              setCalendarVisible(false);
              const selected = params.date.toISOString().split("T")[0];
              setScheduledDate(selected);
            }}
          />

          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <Button mode="outlined" onPress={() => setStep(2)}>
              Back
            </Button>
            <Button mode="contained" disabled={!scheduledDate} onPress={() => setStep(4)}>
              Next
            </Button>
          </View>
        </View>
      )}

      {/* Step 4: Vehicle Details */}
      {step === 4 && (
        <View>
          <Text style={{ fontSize: 20, marginBottom: 10 }}>Vehicle Details</Text>
          <TextInput
            label="Model"
            value={vehicleModel}
            onChangeText={setVehicleModel}
            mode="outlined"
            style={{ marginBottom: 10 }}
          />
          <TextInput
            label="Number"
            value={vehicleNumber}
            onChangeText={setVehicleNumber}
            mode="outlined"
            style={{ marginBottom: 20 }}
          />
          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <Button mode="outlined" onPress={() => setStep(3)}>
              Back
            </Button>
            <Button mode="contained" disabled={!vehicleModel || !vehicleNumber} onPress={() => setStep(5)}>
              Next
            </Button>
          </View>
        </View>
      )}

      {/* Step 5: Preview & Confirm */}
      {step === 5 && (
        <View>
          <Text style={{ fontSize: 20, marginBottom: 10 }}>Preview Booking</Text>
          <Card style={{ marginBottom: 10 }}>
            <Card.Content>
              <Text>Service: {selectedService?.name}</Text>
              <Text>Station: {selectedStation?.name}</Text>
              <Text>Date: {scheduledDate}</Text>
              <Text>Vehicle Model: {vehicleModel}</Text>
              <Text>Vehicle Number: {vehicleNumber}</Text>
              <Text>Total Price: ₹{selectedService?.price || 0}</Text>
            </Card.Content>
          </Card>
          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <Button mode="outlined" onPress={() => setStep(4)}>
              Back
            </Button>
            <Button mode="contained" onPress={createBooking}>
              Confirm Booking
            </Button>
          </View>
        </View>
      )}
    </ScrollView>
  );
}
