export interface Welcome9 {
    LinearLayout: Welcome9LinearLayout;
}

export interface Welcome9LinearLayout {
    "androidx.constraintlayout.widget.ConstraintLayout": AndroidxConstraintlayoutWidgetConstraintLayout;
    "_xmlns:android":                                    string;
    "_xmlns:app":                                        string;
    "_xmlns:tools":                                      string;
    "_android:orientation":                              string;
    "_android:layout_width":                             string;
    "_android:layout_height":                            string;
}

export interface AndroidxConstraintlayoutWidgetConstraintLayout {
    ImageView:                           ImageViewElement[];
    "androidx.cardview.widget.CardView": AndroidxCardviewWidgetCardView;
    TextView:                            TextView[];
    Button:                              Button[];
    LinearLayout:                        AndroidxConstraintlayoutWidgetConstraintLayoutLinearLayout;
    "_android:layout_width":             string;
    "_android:layout_height":            string;
}

export interface Button {
    "_android:id":                            string;
    _style:                                   string;
    "_android:layout_width":                  string;
    "_android:layout_height":                 string;
    "_android:layout_marginTop"?:             string;
    "_android:background"?:                   string;
    "_android:backgroundTint"?:               string;
    "_android:backgroundTintMode"?:           string;
    "_android:padding"?:                      string;
    "_android:shadowColor"?:                  string;
    "_android:text":                          string;
    "_android:textColor"?:                    string;
    "_app:layout_constraintBottom_toTopOf":   string;
    "_app:layout_constraintEnd_toEndOf"?:     string;
    "_app:layout_constraintHorizontal_bias":  string;
    "_app:layout_constraintStart_toEndOf"?:   string;
    "_app:layout_constraintTop_toTopOf":      string;
    "_app:layout_constraintVertical_bias":    string;
    "_app:layout_constraintEnd_toStartOf"?:   string;
    "_app:layout_constraintStart_toStartOf"?: string;
}

export interface ImageViewElement {
    "_android:id":                              string;
    "_android:layout_width":                    string;
    "_android:layout_height":                   string;
    "_app:layout_constraintBottom_toBottomOf"?: string;
    "_app:layout_constraintEnd_toEndOf":        string;
    "_app:layout_constraintHorizontal_bias":    string;
    "_app:layout_constraintStart_toStartOf":    string;
    "_app:layout_constraintTop_toTopOf":        string;
    "_app:layout_constraintVertical_bias":      string;
    "_app:srcCompat":                           string;
    "_app:layout_constraintBottom_toTopOf"?:    string;
}

export interface AndroidxConstraintlayoutWidgetConstraintLayoutLinearLayout {
    "androidx.recyclerview.widget.RecyclerView": AndroidxRecyclerviewWidgetRecyclerView;
    "_android:layout_width":                     string;
    "_android:layout_height":                    string;
    "_android:orientation":                      string;
    "_app:layout_constraintBottom_toBottomOf":   string;
    "_app:layout_constraintEnd_toEndOf":         string;
    "_app:layout_constraintStart_toStartOf":     string;
    "_app:layout_constraintTop_toBottomOf":      string;
}

export interface AndroidxRecyclerviewWidgetRecyclerView {
    "_android:layout_width":  string;
    "_android:layout_height": string;
}

export interface TextView {
    "_android:id":                              string;
    "_android:layout_width":                    string;
    "_android:layout_height":                   string;
    "_android:layout_marginTop"?:               string;
    "_android:text":                            string;
    "_android:textStyle"?:                      string;
    "_app:layout_constraintStart_toStartOf":    string;
    "_app:layout_constraintTop_toBottomOf"?:    string;
    "_app:layout_constraintEnd_toEndOf"?:       string;
    "_app:layout_constraintBottom_toBottomOf"?: string;
    "_app:layout_constraintEnd_toStartOf"?:     string;
    "_app:layout_constraintHorizontal_bias"?:   string;
    "_app:layout_constraintVertical_bias"?:     string;
    "_app:layout_constraintBottom_toTopOf"?:    string;
    "_android:gravity"?:                        string;
    "_android:textAlignment"?:                  string;
    "_app:layout_constraintTop_toTopOf"?:       string;
}

export interface AndroidxCardviewWidgetCardView {
    ImageView:                                 AndroidxCardviewWidgetCardViewImageView;
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

export interface AndroidxCardviewWidgetCardViewImageView {
    "_android:id":            string;
    "_android:layout_width":  string;
    "_android:layout_height": string;
    "_android:scaleType":     string;
    "_tools:srcCompat":       string;
}
