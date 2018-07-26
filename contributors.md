# Conventions & Definitions

##Dictionary of relevant terms

## Employee Compensation
~ tl;dr ~
The following rationale was used when determining data structure and naming conventions for the input drivers used in #Perkolator

## Measurement :
Employee Comp measures the sum total remuneration of:
  EARNINGS INCLUDE:
    - cash consideration
    - in kind consideration

  COMPENSATION EARNED:
    - by employees exchange for work performed in that fiscal period, which is recognized and accrued for in the period earned, not payment received


## Official description: Employee Compensation

###Compensation Of Employees    [meta]
- ref:   #workComp
- source:   Bureau of Economic Analysis (BEA), US Department of Commerce
- usage:     US Federal Code
- context:   codification of terms to standardize


NOTE: The BEA text below is unedited, minor formatting changes notwithstanding)

##Description :
Compensation measures the total remuneration, in cash or in kind, that accrues to
employees in return for their work during the accounting period, regardless of when they are
paid.
 ...
Compensation is equal to:
     - The sum of wages and salaries && of supplements to wages and salaries.

     - Wages and salaries, which generally accounts for over 80 percent of compensation, consists of:
       - cash remuneration of labor, including:
            - sick or vacation pay,
            - severance pay,
            - commissions,
            - tips,
             - bonuses,
               - in-kind remuneration of labor such as transit subsidies and meals.

         - Supplements to wages and salaries consists of:
               - employer payments that are made on behalf of employees but are not included in the regular wage payments provided directly to employee, specifically employer contributions for:
                   - employee pension
                   - insurance funds
                   - employer contributions for government social insurance

Because these payments are made for the benefit of employees and because the value of the contributions is typically determined, in some fashion, by their labor, they are treated as compensation.

source reference
<a href="https:www.bea.gov/national/pdf/chapter10.pdf")></a>


Taking the aforemetioned statutory language  and converting it into code

#MODEL DRIVERS

      dataObject
            Contains only the primitive values which drive the model => restricted to only including values which user's are able to adjust

            Perkolator's particular implementation uses the dataObject only to establish to data structure to initialize on page load and assign default values for initial DOM rendering.

            Hence, the dataObject is intended as a skeleton populated with reasonable default values .
