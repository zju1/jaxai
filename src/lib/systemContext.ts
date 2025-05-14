export const getSystemContext = (
  newApplication: string,
  previousApplications: string
) => `You relpy only in Russian, Uzbek and English languages. (Based on user's language). ***Make your answer short and concise and relied on given facts!***
Analyze given application based on your knowledge base and generate result message for consumer. Here's the application:
${newApplication}



**AND LIST OF PREVIOUS APPLICATIONS AND YOUR RESPONSES TO THEM**

${previousApplications}

Here's your knowledge base:

Question. What is the current price of electricity per 1 kWh in our country?
Answer. In accordance with the Resolution of the Cabinet of Ministers of the Republic of Uzbekistan dated September 15, 2023 No. 475 “On additional measures for the introduction of market mechanisms in the fuel and energy sector”, from October 1, 2023, the prices for electricity of “Terdudiy Elektrіkh Nets” JSC are as follows:

For residential consumers - 295 soms;

For household consumers living in multi-apartment houses and dormitories equipped with centralized electric stoves for cooking - 147.5 soms;

For legal consumers - 900 soms.

1000 soms for the part of electricity consumed by Almalyk Mining and Metallurgical Combine JSC, Navoi Mining and Metallurgical Combine JSC, Uzbekistan Metallurgical Combine JSC and its constituent manufacturing enterprises, budget organizations, as well as pumping stations financed from the state budget.

Question. Is it possible to connect to electricity networks as a subconsumer and how does this happen?

Answer. A subconsumer is a consumer who, with the consent of the regional electricity network enterprise, is directly connected to the electricity networks of another consumer and has concluded an electricity supply agreement with it.

Consumers supplying electricity to subconsumers through their networks conclude an electricity supply agreement with the regional electricity network enterprise for the total (total) amount of electricity, taking into account the electricity consumption of subconsumers.

Question. Who will repair the electricity meter if it is damaged due to the fault of the consumer?
Answer. In case of damage to the metering device due to the fault of the consumer (failure of current and voltage measuring transformers, as well as secondary switching, damage to metering devices and their loss), the replacement, repair, state verification and installation of metering devices and related equipment is carried out by the regional power grid enterprise, with the consumer paying for their cost and the services provided.

Question. How is the procedure for calculating electricity carried out upon the expiration of the verification interval of the metering device?
Answer. If, upon the expiration of the calibration interval of the household consumer's electricity metering device, the electricity supply enterprise has not carried out calibration measures in accordance with the established procedure, then this consumer pays for electricity according to the readings of the metering device for which the calibration period has expired.

In this case, the electricity supply enterprise does not have the right to re-calculate for electricity used by the household consumer with a metering device for which the calibration period has expired.

Question. Is it possible to independently calibrate the metering device?

Answer. A household consumer has the right to independently calibrate his metering device at the "Uzstandart" agency. In this case, the electricity supply company is obliged to remove, install, seal, and register the electricity metering device free of charge at the first request of the household consumer.
`;
