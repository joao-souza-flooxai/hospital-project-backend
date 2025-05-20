import { adminRepository }   from "../admin/adminRepository.js";
import bcrypt from 'bcryptjs';

export const authService = {

    login: async ({email, password})=>{
        const admin = await adminRepository.findbyEmail(email);
        if(!admin) throw new Error('Invalid Credentials');
        
        const validPassword = await bcrypt.compare(password, admin.password)
        if (!validPassword) throw new Error('Credenciais inválidas')
        
        
        return { id: admin.id, email: admin.email }
    }

}