import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
type AppState = {
    data: Job[],
    filteredData: Job[],
    filter: string[]
}
export const fetchJobs = createAsyncThunk<Job[]>("app/fetchJobs", async () => {
    const response = await fetch("./data.json")
    if (!response.ok) throw new Error("Error fetch")
    const data: Job[] = await response.json()
    return data
});
const initialState: AppState = {
    data: [] as Job[],
    filteredData: [],
    filter: []
}
const appReducer = createSlice({
    initialState,
    name: "app",
    reducers: {
        clear(state: AppState) {
            state.filter = []
        },
        addFilter(state: AppState, action: PayloadAction<string>) {
            if (!state.filter.includes(action.payload)) state.filter.push(action.payload)
        },

        removeFilert(state: AppState, action: PayloadAction<string>) {
            state.filter = state.filter.filter((el: string) => el != action.payload)
        },
        applyFilter(state: AppState) {

            if (state.filter.length <= 0) {
                state.filteredData = state.data
            } else {
                state.filteredData = state.data.filter(
                    job => state.filter.some(filter =>
                        job.level === filter ||
                        job.role === filter ||
                        job.languages.includes(filter) ||
                        job.tools.includes(filter)
                    ))
            }

        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchJobs.pending, () => console.log("Still fetching"))
            .addCase(fetchJobs.fulfilled, (state, action: PayloadAction<Job[]>) => {
                state.data = action.payload
                state.filteredData = action.payload
            })
            .addCase(fetchJobs.rejected, (_, action) => console.log(action.error.message))
    },
})
export const { clear, addFilter, removeFilert, applyFilter } = appReducer.actions
export default appReducer.reducer