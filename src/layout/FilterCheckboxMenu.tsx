import React, { useEffect, useState } from 'react';
import CheckboxMenu from '../components/CheckboxMenu';
import { fetchAllSubCategory } from '../services/SubCategoryService';
import { FilterObject, subCategory } from '../initialize/type';

interface FilterProductProps {
    handerChangeFilterObject: (filterObject: FilterObject) => void; // Hàm nhận vào một FilterObject
}

export const FilterCheckboxMenu: React.FC<FilterProductProps> = ({ handerChangeFilterObject }) => {
    const [subCategories, setSubCategories] = useState<subCategory[]>([]);
    const [filterObject, setFilterObject] = useState<FilterObject>({});

    const priceOptions = [
        { label: "Dưới 500.000 VND", minPrice: [0], maxPrice: [500000] },
        { label: "500.000 - 1.000.000 VND", minPrice: [500000], maxPrice: [1000000] },
        { label: "1.000.000 - 1.500.000 VND", minPrice: [1000000], maxPrice: [1500000] },
        { label: "1.500.000 - 5.000.000 VND", minPrice: [1500000], maxPrice: [5000000] },
        { label: "Trên 5.000.000 VND", minPrice: [5000000], maxPrice: [10000000000000] },
    ];

    const colorOptions = ['Đỏ', 'Xanh', 'nâu', 'be', 'Trắng'];
    const sizeOptions = ["90cm", "1m2", "1m4", "1m6", "1m8"];

    // Hàm cập nhật filterObject dựa vào loại và giá trị đã chọn
    const onCheckboxChange = (key: keyof FilterObject, selection: string[]) => {
        const newFilterObject = { ...filterObject, [key]: selection };

        // Cập nhật subCategory khi lựa chọn
        if (key === 'subCategory') {
            const selectedSubCategoryOptions = subCategories.filter(option => selection.includes(option.name));
            const subCategoryIDs = selectedSubCategoryOptions.map(option => option.subCategoryId);

            // Cập nhật subCategory thành các mảng ID
            newFilterObject.subCategory = Array.from(new Set(subCategoryIDs)); // Loại bỏ giá trị trùng
        }

        // Cập nhật minPrice và maxPrice dựa vào lựa chọn giá
        if (key === 'minPrice' || key === 'maxPrice') {
            const selectedPriceOptions = priceOptions.filter(option => selection.includes(option.label));
            const minPrices = selectedPriceOptions.map(option => option.minPrice[0]);
            const maxPrices = selectedPriceOptions.map(option => option.maxPrice[0]);

            // Cập nhật minPrice và maxPrice thành các mảng
                newFilterObject.minPrice = Array.from(new Set(minPrices)); // Loại bỏ giá trị trùng
                newFilterObject.maxPrice = Array.from(new Set(maxPrices)); // Thêm maxPrice vào filterObject
        }

        setFilterObject(newFilterObject);
        handerChangeFilterObject(newFilterObject); // Gọi hàm để cập nhật filterObject
    };

    useEffect(() => {
        const getAllSubCategory = async () => {
            const res = await fetchAllSubCategory();
            setSubCategories(res.data);
        };

        getAllSubCategory();
    }, []);

    return (
        <div>
            <span>BỘ LỌC</span>
            <CheckboxMenu
                label='DANH MỤC'
                options={subCategories.map(subCategory => subCategory.name)}
                value={filterObject.subCategory?.map(id => subCategories.find(sub => sub.subCategoryId === id)?.name) || []}
                onChange={(selection) => onCheckboxChange('subCategory', selection)}
            />

            <CheckboxMenu
                label='GIÁ SẢN PHẨM'
                options={priceOptions.map(option => option.label)}
                value={filterObject.minPrice || []}
                onChange={(selection) => onCheckboxChange('minPrice', selection)} // Sử dụng key là 'minPrice' để xử lý giá
            />

            <CheckboxMenu
                label='MÀU SẮC'
                options={colorOptions}
                value={filterObject.color || []}
                onChange={(selection) => onCheckboxChange('color', selection)}
            />

            <CheckboxMenu
                label='KÍCH THƯỚC'
                options={sizeOptions}
                value={filterObject.size || []}
                onChange={(selection) => onCheckboxChange('size', selection)}
            />
        </div>
    );
};
