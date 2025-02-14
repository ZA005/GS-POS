import { useState } from 'react';
import { Alert } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import { parseCSVFile } from '../../utils/csvUtils'
import { uploadCustomers } from '../../services/Customer/CustomerService';

const useUploadCustomers = () => {
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');
    const [parsedData, setParsedData] = useState([]);

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
            const { data: customers, error: parseErrors } = await parseCSVFile(fileUri);

            if (parseErrors) {
                setError(parseErrors); // Now storing multiple errors
                setUploading(false);
                return;
            }

            if (!customers || customers.length === 0) {
                setError(["Upload Failed: No valid customers to upload."]);
                setUploading(false);
                return;
            }

            const { success, error: uploadError } = await uploadCustomers(customers);

            if (uploadError) {
                setError([uploadError]); // Store as an array for consistency
            }
            if (success) {
                setSuccessMessage('Customers uploaded successfully');
            }

            setParsedData(customers);
        } catch (err) {
            setError(["An error occurred while uploading the file. Please try again."]);
        } finally {
            setUploading(false);
        }
    };

    return { pickFile, uploading, error, successMessage, parsedData };
};


export default useUploadCustomers;
