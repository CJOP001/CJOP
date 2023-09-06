export interface Welcome7 {
    "androidx.constraintlayout.widget.ConstraintLayout": AndroidxConstraintlayoutWidgetConstraintLayout;
}

export interface AndroidxConstraintlayoutWidgetConstraintLayout {
    "androidx.cardview.widget.CardView": AndroidxCardviewWidgetCardView;
    TextView:                            TextView[];
    "_xmlns:android":                    string;
    "_xmlns:app":                        string;
    "_xmlns:tools":                      string;
    "_android:id":                       string;
    "_android:layout_width":             string;
    "_android:layout_height":            string;
}

export interface TextView {
    "_android:id":                              string;
    "_android:layout_width":                    string;
    "_android:layout_height":                   string;
    "_android:layout_marginTop"?:               string;
    "_android:text":                            string;
    "_app:layout_constraintEnd_toEndOf":        string;
    "_app:layout_constraintHorizontal_bias":    string;
    "_app:layout_constraintStart_toEndOf":      string;
    "_app:layout_constraintTop_toTopOf"?:       string;
    "_app:layout_constraintBottom_toBottomOf"?: string;
    "_app:layout_constraintTop_toBottomOf"?:    string;
    "_app:layout_constraintVertical_bias"?:     string;
}

export interface AndroidxCardviewWidgetCardView {
    ImageView:                                 ImageView;
    "_android:id":                             string;
    "_android:layout_width":                   string;
    "_android:layout_height":                  string;
    "_android:layout_centerHorizontal":        string;
    "_android:elevation":                      string;
    "_app:cardCornerRadius":                   string;
    "_app:layout_constraintBottom_toBottomOf": string;
    "_app:layout_constraintEnd_toEndOf":       string;
    "_app:layout_constraintHorizontal_bias":   string;
    "_app:layout_constraintStart_toStartOf":   string;
    "_app:layout_constraintTop_toTopOf":       string;
    "_app:layout_constraintVertical_bias":     string;
}

export interface ImageView {
    "_android:id":            string;
    "_android:layout_width":  string;
    "_android:layout_height": string;
    "_android:scaleType":     string;
    "_tools:srcCompat":       string;
}
