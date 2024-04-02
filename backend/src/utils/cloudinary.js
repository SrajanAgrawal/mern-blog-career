import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';

cloudinary.config({
    cloud_name: 'dgh6qaqqu',
    api_key: '274277648516963',
    api_secret: 'haeRjrwNXfLlzmbs2VK7saTevoo'
});

const uploadFileOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null;
        console.log(localFilePath);
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        });

        fs.unlinkSync(localFilePath);
        // file has been successfully uploaded
        console.log("File has been successfully uploaded", response.url);
        return response;

    } catch (error) {
        console.log(error);
        // delete or unlink the file you have uploaded on your server.
        fs.unlinkSync(localFilePath); // public/temp/rest.jpg
        return null;
    }
}

export { uploadFileOnCloudinary };

