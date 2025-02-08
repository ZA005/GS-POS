import * as FileSystem from 'expo-file-system';
import Customer from '../models/Customer';

const REQUIRED_HEADERS = ["fullname", "home_address", "mobile_no"];

/**
 * Normalizes mobile numbers.
 */
export const normalizeMobileNumber = (mobile) => {
    let normalized = mobile.trim();
    if (!normalized.startsWith('0')) {
        normalized = '0' + normalized;
    }
    return normalized;
};

/**
 * Validates CSV headers.
 */
const validateHeaders = (headers) => {
    const formattedHeaders = headers.map(header => header.trim().toLowerCase());
    return REQUIRED_HEADERS.every(header => formattedHeaders.includes(header));
};


/**
 * Parses a CSV file into an array of Customer objects.
 */
export const parseCSVFile = async (fileUri) => {
    try {
        const content = await FileSystem.readAsStringAsync(fileUri, { encoding: FileSystem.EncodingType.UTF8 });
        const lines = content.split('\n').map(line => line.trim()).filter(line => line !== '');

        if (lines.length < 2) {
            return { error: ["The CSV file is empty or missing data rows."] };
        }

        const headers = lines[0].split(',').map(header => header.trim().toLowerCase());

        if (!validateHeaders(headers)) {
            return { error: [`Invalid CSV format. Required headers: ${REQUIRED_HEADERS.join(", ")}`] };
        }

        const customers = [];
        const errors = [];

        for (let i = 1; i < lines.length; i++) {
            const columns = lines[i].split(',').map(col => col.trim());

            if (columns.length !== headers.length) {
                errors.push(`Invalid row at line ${i + 1}: Expected ${headers.length} columns but got ${columns.length}.`);
                continue;
            }

            const rowData = {};
            headers.forEach((header, index) => {
                rowData[header] = columns[index] || "";
            });

            if (!rowData.fullname || !rowData.home_address || !rowData.mobile_no) {
                errors.push(`Incomplete data at line ${i + 1}. All fields must be filled.`);
                continue;
            }

            customers.push(new Customer(
                null,
                rowData.fullname,
                rowData.home_address,
                normalizeMobileNumber(rowData.mobile_no)
            ));
        }

        return { data: customers, error: errors.length > 0 ? errors : null };
    } catch (error) {
        return { error: ["An error occurred while reading the CSV file. Please try again."] };
    }
};

