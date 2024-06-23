library(shiny)
library(DT)
library(readr)

# Define UI
ui <- fluidPage(
  tags$head(
    tags$style(HTML("
      .title {
        text-align: center;
        margin-bottom: 10px; /* Add some bottom margin for spacing */
      }
      .description {
        text-align: center;
        font-style: italic;
      }
    "))
  ),
  titlePanel(div("Bibliography of Assamese Literature", class = "title")),
  div("This is a repository of books. Refer xxx for reference.", class = "description"),
  fluidRow(
    column(
      width = 12,
      DTOutput("table")
    )
  ),
  fluidRow(
    column(
      width = 12,
      downloadButton("downloadData", "Download Selected Row")
    )
  )
)

# Define server logic
server <- function(input, output, session) {
  
  data <- reactive({
    # Update the URL to point to the hosted CSV file
    url <- "https://saurabhknath.github.io/books.csv"
    read.csv(url, stringsAsFactors = FALSE)
  })
  # Reactive expression for selected row
  selected_row <- reactiveVal(NULL)
  
  # Render the DT table
  output$table <- renderDT({
    datatable(data(), 
              selection = 'single', # Allow single row selection
              options = list(searching = TRUE, 
                             rowCallback = JS(
                               "function(nRow, aData, iDisplayIndex, iDisplayIndexFull) {",
                               "$(nRow).on('click', function() {",
                               "var data = table.row(this).data();",
                               "Shiny.onInputChange('selected_row', data);",
                               "});",
                               "}"))
    )
  })
  
  # Update selected_row reactiveVal based on input$selected_row
  observeEvent(input$selected_row, {
    selected_row(input$selected_row)
  })
  
  # Download selected row as TXT file
  output$downloadData <- downloadHandler(
    filename = function() {
      if (!is.null(selected_row())) {
        paste0("selected_row_", selected_row()$column_name, ".txt")
      }
    },
    content = function(file) {
      if (!is.null(selected_row())) {
        writeLines(selected_row()$column_name, file)
      }
    }
  )
}

# Run the application
shinyApp(ui = ui, server = server)
