import React, { useEffect } from "react";
import styles from "../../styles/style";
import EventCard from "./EventCard";
import { useSelector, useDispatch } from "react-redux";
import { getAllEvents } from "../../redux/actions/event";

const Events = () => {
  const dispatch = useDispatch();

  // ✅ SAFE STATE (prevents undefined crash)
  const { allEvents = [], isLoading = false } = useSelector(
    (state) => state.event || {}
  );

  useEffect(() => {
    dispatch(getAllEvents());
  }, [dispatch]);

  const event = allEvents?.[0];

  return (
    <div>
      {!isLoading && (
        <div className={styles.section}>
          <div className={styles.heading}>
            <h1>Popular Events</h1>
          </div>

          <div className="w-full grid">
            {event ? (
              <EventCard data={event} />
            ) : (
              <h4>No Events available</h4>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Events;