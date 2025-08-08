const Form = () => {
    return (
        <form className="line-form" action="#" method="post" noValidate>
            <label htmlFor="lineName">Line Name</label>
            <input type="text" id="lineName" name="lineName" required />

            <label htmlFor="colorSelect">Color</label>
            <select id="colorSelect" name="colorSelect" required>
                <option value="" disabled selected>
                    Select color
                </option>
                <option value="White">White</option>
                <option value="Black">Black</option>
            </select>

            <label htmlFor="pgnText">PGN</label>
            <textarea id="pgnText" name="pgnText" rows={10} required></textarea>

            <button type="submit">Create Line</button>
        </form>
    )
}

export default Form;
