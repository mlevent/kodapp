import { useState } from 'react';
import { Dialog } from '@headlessui/react';
import axios from 'axios';
import { useForm } from 'react-hook-form';

function Login({ isOpen, setIsOpen }) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = data => {
        console.log(data);
        axios
            .post('https://reqres.in/api/register', data)
            .then(response => {
                if (response.status === 200) {
                    console.log(response);
                    setIsOpen(false);
                }
            })
            .catch(error => console.log(error));
    };

    return (
        <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="fixed z-10 inset-0 overflow-y-auto">
            <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
            <div className="max-w-lg p-6 my-8 mx-auto transition-all transform bg-white shadow-xl rounded">
                <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 gap-3">
                    <div>
                        <label className="mb-1 block text-gray-700">Language</label>
                        <select {...register('language')} className="w-full border border-gray-400 rounded p-3">
                            <option>Javascript</option>
                        </select>
                    </div>
                    <div>
                        <label className="mb-1 block text-gray-700">Email</label>
                        <input
                            {...register('email')}
                            type="text"
                            placeholder="@example.com"
                            className="w-full border border-gray-400 rounded p-3"
                        />
                    </div>
                    <div>
                        <label className="mb-1 block text-gray-700">Password</label>
                        <input
                            {...register('password')}
                            type="password"
                            placeholder="Parolanız"
                            className="w-full border border-gray-400 rounded p-3"
                        />
                    </div>
                    <div className="flex justify-between">
                        <button type="submit" className="bg-blue-900 py-3 px-5 text-white rounded">
                            Gönder
                        </button>
                        <button onClick={() => setIsOpen(false)} className="bg-gray-500 py-3 px-5 text-white rounded">
                            Kapat
                        </button>
                    </div>
                </form>
            </div>
        </Dialog>
    );
}

export default Login;
