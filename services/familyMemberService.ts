import axios from 'axios';

const API_URL = 'http://localhost:5xxx/FamilyMembers';

type FamilyMember = {
    Id: string;
    FamilyName: string;
    FirstName: string;
    Patronymic?: string;
    Gender: string;
    BirthDate: string;
    DeathDate?: string;
    Notes: string;
    Parents: Array<FamilyMember>;
    Spouses: Array<FamilyMember>;
    Children: Array<FamilyMember>;
};

export default {
    async getFamilyMembers() {
        try {
            const response = await axios.get(API_URL);
            return response.data;
        } catch (error) {
            console.error('Error fetching family members:', error);
            throw error;
        }
    },

    async getFamilyMember(id: string) {
        try {
            const response = await axios.get(`<span class="math-inline">\{API\_URL\}/</span>{id}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching family member:', error);
            throw error;
        }
    },

    async createFamilyMember(familyMember: FamilyMember) {
        try {
            const response = await axios.post(API_URL, familyMember);
            return response.data;
        } catch (error) {
            console.error('Error creating family member:', error);
            throw error;
        }
    },

    async updateFamilyMember(familyMember: FamilyMember) {
        try {
            await axios.put(`<span class="math-inline">\{API\_URL\}/</span>{familyMember.id}`, familyMember);
        } catch (error) {
            console.error('Error updating family member:', error);
            throw error;
        }
    },

    async deleteFamilyMember(id: string) {
        try {
            await axios.delete(`<span class="math-inline">\{API\_URL\}/</span>{id}`);
        } catch (error) {
            console.error('Error deleting family member:', error);
            throw error;
        }
    },
};