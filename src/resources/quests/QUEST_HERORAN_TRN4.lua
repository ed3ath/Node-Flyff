QUEST_HERORAN_TRN4 = {
	title = 'IDS_PROPQUEST_INC_000604',
	character = 'MaDa_Liekyen',
	end_character = 'MaDa_Rupim',
	start_requirements = {
		min_level = 60,
		max_level = 60,
		job = { 'JOB_ACROBAT' },
		previous_quest = 'QUEST_HERORAN_TRN3',
	},
	rewards = {
		gold = 0,
		exp = 0,
		items = {
			{ id = 'II_SYS_SYS_QUE_HEROMARK', quantity = 1, sex = 'Any' },
		},
	},
	end_conditions = {
		items = {
			{ id = 'II_SYS_SYS_QUE_BKHEROL', quantity = 8, sex = 'Any', remove = true },
		},
		monsters = {
			{ id = 'MI_PRANKSTER2', quantity = 8 },
		},
	},
	drops = {
		{ item_id = 'II_SYS_SYS_QUE_BKHEROL', monster_id = 'MI_PRANKSTER2', probability = '3000000000' },
	},
	dialogs = {
		begin = {
			'IDS_PROPQUEST_INC_000605',
			'IDS_PROPQUEST_INC_000606',
			'IDS_PROPQUEST_INC_000607',
			'IDS_PROPQUEST_INC_000608',
		},
		begin_yes = {
			'IDS_PROPQUEST_INC_000609',
		},
		begin_no = {
			'IDS_PROPQUEST_INC_000610',
		},
		completed = {
			'IDS_PROPQUEST_INC_000611',
			'IDS_PROPQUEST_INC_000612',
		},
		not_finished = {
			'IDS_PROPQUEST_INC_000613',
		},
	}
}
