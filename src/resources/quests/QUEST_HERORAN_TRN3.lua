QUEST_HERORAN_TRN3 = {
	title = 'IDS_PROPQUEST_INC_000593',
	character = 'MaFl_Kimel',
	end_character = 'MaDa_Liekyen',
	start_requirements = {
		min_level = 60,
		max_level = 60,
		job = { 'JOB_ACROBAT' },
		previous_quest = 'QUEST_HERORAN_TRN2',
	},
	rewards = {
		gold = 0,
		exp = 0,
		items = {
			{ id = 'II_SYS_SYS_QUE_SCRSTAMP', quantity = 1, sex = 'Any' },
		},
	},
	end_conditions = {
		items = {
			{ id = 'II_SYS_SYS_QUE_LTHYNAN', quantity = 1, sex = 'Any', remove = true },
		},
	},
	dialogs = {
		begin = {
			'IDS_PROPQUEST_INC_000594',
			'IDS_PROPQUEST_INC_000595',
		},
		begin_yes = {
			'IDS_PROPQUEST_INC_000596',
		},
		begin_no = {
			'IDS_PROPQUEST_INC_000597',
		},
		completed = {
			'IDS_PROPQUEST_INC_000598',
			'IDS_PROPQUEST_INC_000599',
			'IDS_PROPQUEST_INC_000600',
		},
		not_finished = {
			'IDS_PROPQUEST_INC_000601',
		},
	}
}
