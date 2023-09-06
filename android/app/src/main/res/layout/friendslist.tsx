export interface Welcome8 {
    LinearLayout: Welcome8LinearLayout;
}

export interface Welcome8LinearLayout {
    LinearLayout:                                LinearLayoutElement[];
    "androidx.recyclerview.widget.RecyclerView": AndroidxRecyclerviewWidgetRecyclerView;
    "_xmlns:android":                            string;
    "_xmlns:app":                                string;
    "_xmlns:tools":                              string;
    "_android:layout_width":                     string;
    "_android:layout_height":                    string;
    "_android:orientation":                      string;
}

export interface LinearLayoutElement {
    "androidx.constraintlayout.widget.ConstraintLayout"?: AndroidxConstraintlayoutWidgetConstraintLayout;
    "_android:layout_width":                              string;
    "_android:layout_height":                             string;
    "_android:orientation":                               string;
    SearchView?:                                          SearchView;
    Button?:                                              ButtonElement[];
}

export interface ButtonElement {
    "_android:id":            string;
    _style:                   string;
    "_android:layout_width":  string;
    "_android:layout_height": string;
    "_android:layout_weight": string;
    "_android:text":          string;
}

export interface SearchView {
    "_android:layout_width":  string;
    "_android:layout_height": string;
    "_android:inputType":     string;
}

export interface AndroidxConstraintlayoutWidgetConstraintLayout {
    ImageView:                ImageView;
    TextView:                 TextView;
    Button:                   AndroidxConstraintlayoutWidgetConstraintLayoutButton;
    "_android:layout_width":  string;
    "_android:layout_height": string;
    "_android:layout_weight": string;
}

export interface AndroidxConstraintlayoutWidgetConstraintLayoutButton {
    "_android:id":                           string;
    _style:                                  string;
    "_android:layout_width":                 string;
    "_android:layout_height":                string;
    "_android:text":                         string;
    "_app:layout_constraintBottom_toTopOf":  string;
    "_app:layout_constraintEnd_toStartOf":   string;
    "_app:layout_constraintHorizontal_bias": string;
    "_app:layout_constraintStart_toStartOf": string;
    "_app:layout_constraintTop_toTopOf":     string;
    "_app:layout_constraintVertical_bias":   string;
}

export interface ImageView {
    "_android:id":                             string;
    "_android:layout_width":                   string;
    "_android:layout_height":                  string;
    "_android:layout_weight":                  string;
    "_app:layout_constraintBottom_toBottomOf": string;
    "_app:layout_constraintEnd_toEndOf":       string;
    "_app:layout_constraintStart_toStartOf":   string;
    "_app:layout_constraintTop_toTopOf":       string;
    "_app:srcCompat":                          string;
}

export interface TextView {
    "_android:id":                           string;
    "_android:layout_width":                 string;
    "_android:layout_height":                string;
    "_android:layout_marginTop":             string;
    "_android:gravity":                      string;
    "_android:text":                         string;
    "_android:textAlignment":                string;
    "_app:layout_constraintEnd_toEndOf":     string;
    "_app:layout_constraintStart_toStartOf": string;
    "_app:layout_constraintTop_toTopOf":     string;
}

export interface AndroidxRecyclerviewWidgetRecyclerView {
    "_android:layout_width":  string;
    "_android:layout_height": string;
}