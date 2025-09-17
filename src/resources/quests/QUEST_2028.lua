QUEST_2028 = {
	title = 'IDS_PROPQUEST_REQUESTBOX_INC_000309',
	character = 'MaDa_Lurif',
	end_character = 'MaDa_Lurif',
	start_requirements = {
		min_level = 53,
		max_level = 58,
		job = { 'JOB_ASSIST', 'JOB_MERCENARY', 'JOB_MAGICIAN', 'JOB_ACROBAT' },
		previous_quest = '',
	},
	rewards = {
		gold = 159000,
		exp = 555468,
	},
	end_conditions = {
		items = {
			{ id = 'II_GEN_GEM_GEM_STEAMTEAR', quantity = 40, sex = 'Any', remove = true },
		},
	},
	dialogs = {
		begin = {
			'IDS_PROPQUEST_REQUESTBOX_INC_000310',
		},
		begin_yes = {
			'IDS_PROPQUEST_REQUESTBOX_INC_000311',
		},
		begin_no = {
			'IDS_PROPQUEST_REQUESTBOX_INC_000312',
		},
		completed = {
			'IDS_PROPQUEST_REQUESTBOX_INC_000313',
		},
		not_finished = {
			'IDS_PROPQUEST_REQUESTBOX_INC_000314',
		},
	}
}
