<template>
  <div>
    <h1>Swedish Royal Family</h1>
    <ul v-if="royalFamily.length > 0">
      <li v-for="member in royalFamily[0]" :key="member.id">
        <div class="member-info">
          <p><strong>Name:</strong> {{ member.firstName || 'N/A' }} {{ member.familyName || 'N/A' }}</p>
          <p><strong>Gender:</strong> {{ getGender(member.gender) }}</p>
        </div>
      </li>
    </ul>
    <p v-else-if="loading">Loading...</p>
    <p v-else-if="error">Error fetching data.</p>
    <p v-else>No members found.</p>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

interface FamilyMember {
  id: string;
  familyName: string;
  firstName: string;
  gender: number; // Assuming your Gender enum is represented as numbers (0=Male, 1=Female, etc.)
  birthDate: string | null; // ISO 8601 date string
  deathDate: string | null;
}

const royalFamily = ref<FamilyMember[]>([]);
const loading = ref(true);
const error = ref(false);

async function fetchSwedishRoyalFamily(): Promise<FamilyMember[]> {
  try {
    const response = await fetch('http://localhost:5265/swedish-royal-family-api');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data: FamilyMember[] = await response.json();
    // console.log(data);
    return data;
  } catch (err) {
    error.value = true;
    console.error('Error fetching Swedish Royal Family:', err);
    return [];
  } finally {
    loading.value = false;
  }
}

onMounted(async () => {
  royalFamily.value = await fetchSwedishRoyalFamily();
  console.log("VALUE:", royalFamily.value);
  console.log("RAW:", royalFamily);
  console.log(royalFamily.value.length);
});

function getGender(gender: number): string {
  switch (gender) {
    case 0:
      return 'Male';
    case 1:
      return 'Female';
    case 2:
      return 'Other';
    case 3:
      return 'Unknown';
    default:
      return 'Unknown';
  }
}

</script>

<style>
body {
  color: white;
  background-color: black;
}
</style>