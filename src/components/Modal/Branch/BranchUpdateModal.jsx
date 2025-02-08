import React, { useState, useEffect } from 'react';
import ModalForm from '../ModalForm';
import Branch from '../../../models/Branch';
import { fetchBranch, updateBranch } from '../../../services/Branch/BranchService';
import CustomAlert from '../../Alert/CustomAlert';

const BranchUpdate = ({ visible, onClose }) => {
    const [branchID, setBranchID] = useState('');
    const [branchName, setBranchName] = useState('');
    const [branchAddress, setBranchAddress] = useState('');
    const [alertVisible, setAlertVisible] = useState(false);

    useEffect(() => {
        if (visible) {
            const fetchData = async () => {
                const fetchedBranch = await fetchBranch();
                if (fetchedBranch) {
                    setBranchID(fetchedBranch.getID())
                    setBranchName(fetchedBranch.getName());
                    setBranchAddress(fetchedBranch.getAddress());
                }
            };
            fetchData();
        }
    }, [visible]);


    const handleSubmit = async () => {

        try {
            const updatedBranch = new Branch(branchID, branchName, branchAddress);
            await updateBranch(updatedBranch);

            setBranchID('')
            setBranchName('')
            setBranchAddress('')

            setAlertVisible(true);
            setTimeout(() => {
                setAlertVisible(false);
                onClose();
            }, 3000);
        } catch (e) {
            console.error(e)
        }
    };

    const fields = [
        {
            mode: 'outlined',
            label: 'Branch ID',
            placeholder: 'Branch ID',
            value: branchID,
            onChangeText: setBranchName,
            disabled: true,
        },
        {
            mode: 'outlined',
            label: 'Branch Name',
            placeholder: 'Branch Name',
            value: branchName,
            onChangeText: setBranchName,
            validation: (value) => !value.trim() ? "Branch Name is required" : null
        },
        {
            mode: 'outlined',
            label: 'Branch Address',
            placeholder: 'Branch Address',
            value: branchAddress,
            onChangeText: setBranchAddress,
            validation: (value) => !value.trim() ? "Branch Address is required" : null
        }
    ];
    return (
        <>
            <ModalForm
                visible={visible}
                onClose={onClose}
                title="Update Branch"
                fields={fields}
                onSubmit={handleSubmit}
                submitButtonLabel="Update"
                onSecondaryAction={() => console.log("Deactivate action")}
                action="updat"
                entity="Branch"
            />

            <CustomAlert
                visible={alertVisible}
                onConfirm={() => setAlertVisible(false)}
                action="update"
                entity="Branch"
            />
        </>

    );
};

export default BranchUpdate;