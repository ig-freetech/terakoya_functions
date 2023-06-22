"use client";

import DeleteIcon from "@mui/icons-material/Delete";
import { Box, Typography, Button, TextField, Tooltip } from "@mui/material";
import React from "react";
import { Controller } from "react-hook-form";

import { Loading } from "@components/elements/loading";
import { BasicPaper } from "@components/elements/paper";

import { useSettingExcludedDates } from "./hook";

export default function Page() {
  const {
    isLoadingFetchDates,
    isLoadingUpdateDates,
    onUpdate,
    onAddDateTextBox,
    onDeleteDateTextBox,
    control,
    fields,
    hasError,
    helperText,
  } = useSettingExcludedDates();

  const AddButton = () => (
    <Tooltip title="空のテキストボックスがある状態では追加はできません">
      <Button
        onClick={onAddDateTextBox}
        type="button"
        // Set the color of the button, using one of the theme color values.
        // https://mui.com/material-ui/react-button/#color
        color="secondary"
        // Set the variant of the button, using one of the theme shape values.
        // https://mui.com/material-ui/react-button/#shape
        variant="contained"
        sx={{ marginLeft: 1 }}
      >
        +
      </Button>
    </Tooltip>
  );

  return (
    <Box display="flex" justifyContent="center" alignItems="center">
      <BasicPaper backgroundColor="#f5f5f5">
        <Box flexDirection="column">
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            sx={{ backgroundColor: "#4a90e2", height: "calc(100vh * 0.1)" }}
          >
            <Typography
              variant="h5"
              sx={{
                color: "white",
              }}
            >
              Setting Excluded Dates
            </Typography>
          </Box>
          {isLoadingFetchDates ? (
            <Loading />
          ) : (
            <form onSubmit={onUpdate}>
              <Box display="flex" flexDirection="column" alignItems="center">
                <Box
                  display="flex"
                  flexDirection="column"
                  alignItems="flex-start"
                >
                  {fields.length === 0 ? (
                    <AddButton />
                  ) : (
                    fields.map((field, index) => {
                      return (
                        // field.id is the unique identifier for this field automatically generated by useFieldArray hook
                        // field.id must be assigned as the key to the root component you are returning in the map function.
                        // https://www.react-hook-form.com/api/usefieldarray/#rules
                        <Box display="flex" alignItems="center" key={field.id}>
                          {/* https://mui.com/material-ui/react-tooltip/ */}
                          <Tooltip title="Delete Date Text Box">
                            <Button
                              onClick={() => onDeleteDateTextBox(index)}
                              type="button"
                              color="secondary"
                              variant="outlined"
                              sx={{ marginRight: 1 }}
                            >
                              <DeleteIcon />
                            </Button>
                          </Tooltip>
                          <Controller
                            control={control}
                            // Specify unique name of the input (ex: <TextField/>, <input/>) controlled by <Controller />
                            // https://www.react-hook-form.com/api/usecontroller/controller/
                            name={`dates.${index}`}
                            // field is an object that provides properties (ex: value, onChange etc...) related to the input element controlled by the Controller component of React Hook Form.
                            render={({ field }) => (
                              <TextField
                                // field has value, onChange, onBlur, and name props, so they can be spread into <Component />
                                // value and onChange can be assigned to <Component /> to display the value or reflect the value change in the field controlled by React Hook Form.
                                // https://www.react-hook-form.com/api/usefieldarray/#example
                                {...field}
                                error={hasError(index)}
                                helperText={helperText(index)}
                                placeholder="2023-01-01"
                                variant="outlined"
                                sx={{ marginTop: 1 }}
                              />
                            )}
                          />
                          {index === fields.length - 1 && <AddButton />}
                        </Box>
                      );
                    })
                  )}
                </Box>
                {isLoadingUpdateDates ? (
                  <Loading text="Processing..." />
                ) : (
                  <Button
                    type="submit"
                    variant="contained"
                    sx={{ width: "200px", marginTop: 5, marginBottom: 5 }}
                  >
                    Update
                  </Button>
                )}
              </Box>
            </form>
          )}
        </Box>
      </BasicPaper>
    </Box>
  );
}
