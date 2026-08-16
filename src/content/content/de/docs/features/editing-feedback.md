+++
title = "Bearbeiten und Feedback"
description = "Quellseiten verlinken und optional Leserfeedback erfassen."
weight = 110
icon = "pencil"
+++

`params.editURL` zeigt auf das Verzeichnis mit den Markdown-Quellen. Das Theme
hängt den relativen Seitenpfad an. Für getrennte Sprachverzeichnisse kann der Wert
als Tabelle mit `default`, `de` und `fr` angegeben werden.

`params.feedbackEndpoint` ist optional. Der Browser sendet Pfad, Bewertung, Titel
und Sprache. Die Begrenzung im Browser verbessert nur die Bedienung; der Server
muss Herkunft und Felder prüfen, Körpergrößen begrenzen und eine eigene
Ratenbegrenzung durchsetzen.
