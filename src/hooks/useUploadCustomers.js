import { useState } from 'react';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import Customer from '../models/Customer';
import { uploadCustomers } from '../services/Customer/CustomerService';

const useUploadCustomers = () => {
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');
    const [parsedData, setParsedData] = useState([]);

    const normalizeMobileNumber = (mobile) => {
        let normalized = mobile.trim();
        if (!normalized.startsWith('0')) {
            normalized = '0' + normalized;
        }
        return normalized;
    };

    const pickFile = async () => {
        try {
            setUploading(true);
            setError(null);
            setSuccessMessage('');
            setParsedData([]);

            const result = await DocumentPicker.getDocumentAsync({
                type: ["text/csv", "application/csv", "text/comma-separated-values"],
                copyToCacheDirectory: true,
            });

            if (result.canceled) {
                setUploading(false);
                return;
            }

            const fileUri = result.assets[0].uri;
            const content = await FileSystem.readAsStringAsync(fileUri, { encoding: FileSystem.EncodingType.UTF8 });

            const lines = content.split('\n').filter(line => line.trim() !== '');
            const customers = [];

            for (let i = 1; i < lines.length; i++) {
                const columns = lines[i].split(',');

                if (columns.length !== 3) {
                    console.warn(`Skipping invalid row: ${lines[i]}`);
                    continue;
                }

                const [fullname, home_address, mobile_no] = columns.map(col => col.trim());

                if (!fullname || !home_address || !mobile_no) {
                    console.warn(`Skipping incomplete row: ${lines[i]}`);
                    continue;
                }

                // Create Customer instance
                const customer = new Customer(null, fullname, home_address, normalizeMobileNumber(mobile_no));
                customers.push(customer);
            }

            if (customers.length > 0) {
                await uploadCustomers(customers);
                setSuccessMessage(`Successfully uploaded ${customers.length} customers.`);
            } else {
                setError("No valid customers to upload.");
            }

            setParsedData(customers);
        } catch (err) {
            setError('Error uploading file. Please try again.');
            console.error(err);
        } finally {
            setUploading(false);
        }
    };

    return { pickFile, uploading, error, successMessage, parsedData };
};

export default useUploadCustomers;
