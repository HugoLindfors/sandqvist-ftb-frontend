<template>
  <div>
    <h1>Swedish Royal Family</h1>
    <ul v-if="swedishRoyalFamily.length > 0">
      <li v-for="member in swedishRoyalFamily" :key="member.id">
        <div class="member-info">
          <p><strong>Name:</strong> {{ member.firstName || 'N/A' }} {{ member.familyName || 'N/A' }}</p>
          <p><strong>Gender:</strong> {{ getGender(member.gender) }}</p>
          <p><strong>Birth Date:</strong> {{ member.birthDate }}</p>
          <p v-if="member.deathDate"><strong>Death Date:</strong> {{ member.deathDate }}</p>
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
  id: number;
  familyName: string;
  firstName: string;
  gender: number;
  birthDate: string | null;
  deathDate: string | null;
}

const swedishRoyalFamily = ref<FamilyMember[]>([]);
const loading = ref(true);
const error = ref(false);

async function fetchSwedishRoyalFamily(): Promise<FamilyMember[]> {
  try {
    const response = await fetch('http://localhost:5265/swedish-royal-family-api');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data: FamilyMember[] = await response.json();
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
  swedishRoyalFamily.value = await fetchSwedishRoyalFamily();
  console.log('VALUE:', swedishRoyalFamily.value);
  console.log('RAW:', swedishRoyalFamily);
  console.log(swedishRoyalFamily.value.length);
  let familyMembers = swedishRoyalFamily.value.$values;
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

ul {
  list-style-type: none;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
}

li {
  border: 1px solid white;
  border-radius: 15px;
  width: 20vw;
  margin: 10px;
  padding: 10px;
}
</style>