import RequestForm from "../components/RequestForm";

const CreateRequest = (props) => {
    const create = async (data) => {
        const res = await fetch('https://localhost:44374/api/issue/CreateRepair', {
            method: 'POST',
            mode: 'cors',
            credentials: 'same-origin',
            headers: new Headers({
                'Content-Type': 'application/json',
                Accept: 'application/json',
            }),
            body: JSON.stringify(data),
        });

        console.log('response: ', res);

        if (res.status === 200) {
            const newRequest = await res.json();
            if (newRequest.id) {
                alert(`Request created with id: ${newRequest.id}`);
            } else {
                alert('Request failed');
            }
        }
    };

    const onSubmit = async (values) => {
        console.log('values: ', values);

        const preparedData = {
            Name: values.name,
            Email: values.email,
            LaptopType: values.laptopType,
            Issue: values.issue,
            Notes: values.notes,
            Date: new Date(values.date).toJSON(),
            SerialNumber: values.serialNumber,
            Picture: '',
        };

        if (values.picture) {
            const reader = new FileReader();
            reader.readAsDataURL(values.picture);

            reader.onload = async () => {
                preparedData.Picture = reader.result;

                let encoded = reader.result.toString().replace(/^data:(.*,)?/, '');
                if ((encoded.length % 4) > 0) {
                    encoded += '='.repeat(4 - (encoded.length % 4));
                }
                preparedData.Picture = encoded;
                await create(preparedData);
            };
        } else {
            await create(preparedData);
        }
    };


    return (
        <div>
            <RequestForm onSubmit={onSubmit} />
        </div>

    )
};

export default CreateRequest;