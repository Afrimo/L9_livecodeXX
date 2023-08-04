import React from "react";
import {createRoot} from "react-dom/client";
import {AddMovie} from "../addMovie";
import {act, Simulate} from "react-dom/test-utils";
import {MemoryRouter} from "react-router-dom";
describe("test suite for adding movies", () => {


    it('shows form ', async () => {
        const element = document.createElement("div")
        const root = createRoot(element)

        await act( async () => {
            root.render(
                <MemoryRouter>
                    <AddMovie/>
                </MemoryRouter>
            )
        })

        expect(element.innerHTML).toMatchSnapshot();

    });


    it('adds movie',  async () => {
        const element = document.createElement("div")
        const root = createRoot(element)

        const createMovie = jest.fn();

        await act( async () => {
            root.render(
                <MemoryRouter>
                    <AddMovie movieApi={{createMovie}}/>
                </MemoryRouter>
            )
        })

        act( () =>
            Simulate.change(element.querySelector("form input"), {
                target: {value: "Movie Title"}
            })
        )

        act( () =>
            Simulate.submit(element.querySelector("form"))
        )

        expect(createMovie).toBeCalledWith(
            {
                title: "Movie Title",
                year: "",
                plot: ""
            }
        )
    });

})


























