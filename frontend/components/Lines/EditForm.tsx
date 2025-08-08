import { useAppContext } from '@/contexts/Context';

const EditForm = () => {
    const { appState: { userLines, editLine } } = useAppContext();

    return (
        <form className="line-form" action="#" method="post" noValidate>
            <label htmlFor="lineName">{userLines[editLine].Name}</label>
            <input type="text" id="lineName" name="lineName" required />

            <label htmlFor="colorSelect">Color</label>
            <select id="colorSelect" name="colorSelect" required defaultValue="">
                <option value={userLines[editLine].Color} disabled>
                    Select color
                </option>
                <option value="White">White</option>
                <option value="Black">Black</option>
            </select>

            <label htmlFor="pgnText">PGN</label>
            <textarea id="pgnText" name="pgnText" rows={10} required>{userLines[editLine].OriginalPGN}</textarea>

            <button type="submit">Create Line</button>
        </form>
    )
}

export default EditForm;

